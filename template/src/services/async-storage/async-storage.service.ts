import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageServiceClass {
  async setNumber(key: string, value: number) {
    return AsyncStorage.setItem(key, value.toString());
  }

  async getNumber(key: string) {
    const res = await AsyncStorage.getItem(key);

    if (res) {
      return Number(res);
    } else {
      return 0;
    }
  }

  async getString(key: string) {
    return AsyncStorage.getItem(key);
  }

  async popString(key: string) {
    const item = await AsyncStorage.getItem(key);
    await AsyncStorage.removeItem(key);
    return item;
  }

  async setString(key: string, value: string) {
    return AsyncStorage.setItem(key, value);
  }

  async getObject(key: string) {
    const res = await AsyncStorage.getItem(key);

    try {
      if (!res) {
        return {};
      }

      return JSON.parse(res as string);
    } catch (e) {
      return {};
    }
  }

  async setObject(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async getArray(key: string) {
    const res = await AsyncStorage.getItem(key);

    try {
      return JSON.parse(res as string);
    } catch (e) {
      return [];
    }
  }

  async setArray(key: string, value: any[]) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string) {
    return AsyncStorage.removeItem(key);
  }
}

export type IAsyncStorageService = typeof AsyncStorageServiceClass;

export const AsyncStorageService = new AsyncStorageServiceClass();
