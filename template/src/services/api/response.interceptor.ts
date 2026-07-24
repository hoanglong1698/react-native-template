import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import { reset, ScreenName } from '@/navigation';
import { ENDPOINTS } from '@/constants';

// Flag indicating whether a token refresh request is currently in progress
let isRefreshing = false;

// Queue of failed requests arriving while token refresh is in progress
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

/**
 * Process queued requests:
 * - If token refresh succeeded: resolve pending promises with the new token so they can be retried.
 * - If token refresh failed: reject pending promises with the error.
 */
const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    // 1. SUCCESSFUL RESPONSE HANDLER (HTTP Status 2xx)
    response => {
      // Automatically unwrap response data so callers receive payload directly without response.data
      return response.data;
    },

    // 2. ERROR RESPONSE HANDLER (HTTP Status 4xx, 5xx)
    async error => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized errors for non-retried requests and endpoints where skip_auth is false
      if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.skip_auth) {
        const refreshTokenUrl = ENDPOINTS.REFRESH_TOKEN;

        // STEP 2.1: If template app does NOT configure a refresh token URL, clear storage and logout immediately
        if (!refreshTokenUrl) {
          await useAuthStore.getState().clearTokens();
          reset(ScreenName.Login);
          return Promise.reject(error);
        }

        // STEP 2.2: Race Condition Prevention - If a refresh request is already pending:
        // Push subsequent 401 requests into failedQueue and wait for the first request to finish refreshing.
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return instance(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }

        // STEP 2.3: Mark current request as retried and set refresh flag for the primary handler
        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = useAuthStore.getState().refreshToken;

        if (refreshToken) {
          try {
            // Silently request a new Access Token using the Refresh Token
            const res = await instance.post<any, { accessToken: string; refreshToken: string }>(
              refreshTokenUrl,
              { refreshToken },
              { skip_auth: true },
            );

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res;

            // Save new tokens to Zustand Store and Keychain
            await useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

            // Update original request Authorization header with new access token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }

            // Resolve queued requests and retry the original failed request
            processQueue(null, newAccessToken);
            return instance(originalRequest);
          } catch (refreshError) {
            // If token refresh failed: reject queue, clear stored tokens, and redirect to Login
            processQueue(refreshError, null);
            await useAuthStore.getState().clearTokens();
            reset(ScreenName.Login);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          // No refresh token found in storage: clear tokens and redirect to Login
          isRefreshing = false;
          await useAuthStore.getState().clearTokens();
          reset(ScreenName.Login);
        }
      }

      // Reject all other errors
      return Promise.reject(error);
    },
  );
};
