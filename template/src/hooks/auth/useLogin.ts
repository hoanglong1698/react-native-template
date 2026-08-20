import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { ENDPOINTS } from '@/constants';
import { reset, ScreenName } from '@/navigation';
import { axiosAPI } from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';
import { AuthResponse, LoginPayload } from '@/types';

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  await axiosAPI.post(ENDPOINTS.LOGIN, payload, { skip_auth: true });
  return {
    accessToken: `mock_access_token_${Date.now()}`,
    refreshToken: `mock_refresh_token_${Date.now()}`,
    user: {
      id: 1,
      username: payload.username || 'user',
    },
  };
};

export const useLogin = (): UseMutationResult<AuthResponse, Error, LoginPayload> => {
  const setTokens = useAuthStore(state => state.setTokens);

  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: async data => {
      await setTokens(data.accessToken, data.refreshToken);
      reset(ScreenName.BottomTab);
    },
  });
};
