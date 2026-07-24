import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth.store';

/**
 * Configure Request Interceptor:
 * Automatically checks and injects Authorization Bearer Token before dispatching outgoing requests.
 */
export const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // 1. Check if skip_auth flag is false (not a public endpoint like Login/Register)
      if (config.skip_auth !== true) {
        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
          // Attach Access Token to Authorization header as Bearer Token
          config.headers.Authorization = `Bearer ${accessToken}`;
        } else if (!config.auth_optional) {
          // If no token exists AND auth_optional flag is false -> throw error on Client
          throw new Error(
            'Unauthorized! Authentication is not available. You may need to sign in again and retry.',
          );
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
};
