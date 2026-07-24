import { deleteItem, getItem, setItem } from 'react-native-sensitive-info';

const OPTIONS = {
  service: 'com.template.auth',
  accessControl: 'none' as const,
};

export const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export class KeychainService {
  static async setAccessToken(token: string): Promise<void> {
    await setItem(KEYS.ACCESS_TOKEN, token, OPTIONS);
  }

  static async getAccessToken(): Promise<string | null> {
    const item = await getItem(KEYS.ACCESS_TOKEN, OPTIONS);
    return item?.value || null;
  }

  static async setRefreshToken(token: string): Promise<void> {
    await setItem(KEYS.REFRESH_TOKEN, token, OPTIONS);
  }

  static async getRefreshToken(): Promise<string | null> {
    const item = await getItem(KEYS.REFRESH_TOKEN, OPTIONS);
    return item?.value || null;
  }

  static async setAuthTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      this.setAccessToken(accessToken),
      this.setRefreshToken(refreshToken),
    ]);
  }

  static async getAuthTokens(): Promise<{ accessToken: string | null; refreshToken: string | null }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(),
      this.getRefreshToken(),
    ]);
    return { accessToken, refreshToken };
  }

  static async clearAuthTokens(): Promise<void> {
    await Promise.all([
      deleteItem(KEYS.ACCESS_TOKEN, OPTIONS),
      deleteItem(KEYS.REFRESH_TOKEN, OPTIONS),
    ]);
  }
}

export default KeychainService;
