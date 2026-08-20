import { reset, ScreenName } from '@/navigation';
import { useAuthStore } from '@/stores/auth.store';

export const useLogout = () => {
  const clearTokens = useAuthStore(state => state.clearTokens);

  const logout = async () => {
    await clearTokens();
    reset(ScreenName.Login);
  };

  return { logout };
};
