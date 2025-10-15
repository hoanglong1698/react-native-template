import { StorageKeys } from '@/constants';
import { MMKV } from 'react-native-mmkv';

export const mmkvStorage = new MMKV();

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

  delete(key: StorageKeys) {
    mmkvStorage.delete(key);
  }
}

export default new MMKVService();
