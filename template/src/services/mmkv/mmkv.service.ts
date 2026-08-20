import { createMMKV } from 'react-native-mmkv';
import { StorageKeys } from '@/constants';

export const mmkvStorage = createMMKV();

class MMKVService {
  setData(key: StorageKeys, value: any) {
    try {
      if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
        mmkvStorage.set(key, value);
      } else {
        mmkvStorage.set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log('MMKV setData error', error);
    }
  }

  getString(key: StorageKeys) {
    return mmkvStorage.getString(key);
  }

  getNumber(key: StorageKeys) {
    return mmkvStorage.getNumber(key);
  }

  getBoolean(key: StorageKeys) {
    return mmkvStorage.getBoolean(key);
  }

  getObject(key: StorageKeys) {
    try {
      const data = mmkvStorage.getString(key);
      if (data) {
        const parseData = JSON.parse(data);
        return parseData;
      }
    } catch (error) {
      return null;
    }
  }

  remove(key: StorageKeys) {
    mmkvStorage.remove(key);
  }
}

export default new MMKVService();
