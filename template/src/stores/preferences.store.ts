import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/services/mmkv/mmkv.service';
import { LanguageVariant, StorageKeys, ThemesVariant } from '@/constants';

export interface AppPreferencesState {
  theme: ThemesVariant;
  language: string;
  setTheme: (theme: ThemesVariant) => void;
  setLanguage: (language: string) => void;
}

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return mmkvStorage.set(name, value);
  },
  getItem: (name) => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return mmkvStorage.remove(name);
  },
};

export const useAppPreferences = create<AppPreferencesState>()(
  persist(
    (set) => ({
      theme: ThemesVariant.LIGHT,
      language: LanguageVariant.EN,
      setTheme: (theme: ThemesVariant) => set({ theme }),
      setLanguage: (language: string) => set({ language }),
    }),
    {
      name: StorageKeys.APP_PREFERENCES,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
