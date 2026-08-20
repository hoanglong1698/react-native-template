import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ENDPOINTS } from '@/constants';
import { axiosAPI } from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';
import { RefreshTokenPayload, RefreshTokenResponse } from '@/types';

export const refreshTokenApi = async (payload: RefreshTokenPayload): Promise<RefreshTokenResponse> => {
  if (!ENDPOINTS.REFRESH_TOKEN) {
    throw new Error('Refresh token endpoint is not configured in API_ENDPOINTS.');
  }
  return axiosAPI.post<RefreshTokenResponse>(ENDPOINTS.REFRESH_TOKEN, payload, { skip_auth: true });
};

export const useRefreshToken = (): UseMutationResult<RefreshTokenResponse, Error, void> => {
  const refreshToken = useAuthStore(state => state.refreshToken);
  const setTokens = useAuthStore(state => state.setTokens);

  return useMutation<RefreshTokenResponse, Error, void>({
    mutationFn: async () => {
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      return refreshTokenApi({ refreshToken });
    },
    onSuccess: async data => {
      await setTokens(data.accessToken, data.refreshToken);
    },
  });
};
