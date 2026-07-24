import { useAuthStore } from '@/stores/auth.store';
import { reset, ScreenName } from '@/navigation';

export const useLogout = () => {
  const clearTokens = useAuthStore(state => state.clearTokens);

  const logout = async () => {
    await clearTokens();
    reset(ScreenName.Login);
  };

  return { logout };
};
