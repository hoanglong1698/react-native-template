import { create } from 'zustand';
import { KeychainService } from '@/services/keychain';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  clearTokens: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isInitializing: true,

  setTokens: async (accessToken: string, refreshToken: string) => {
    await KeychainService.setAuthTokens(accessToken, refreshToken);
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
      isInitializing: false,
    });
  },

  clearTokens: async () => {
    await KeychainService.clearAuthTokens();
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isInitializing: false,
    });
  },

  initializeAuth: async () => {
    try {
      const { accessToken, refreshToken } = await KeychainService.getAuthTokens();
      if (accessToken && refreshToken) {
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isInitializing: false,
        });
      } else {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isInitializing: false,
        });
      }
    } catch {
      set({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isInitializing: false,
      });
    }
  },
}));
