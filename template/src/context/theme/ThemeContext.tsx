import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { ColorPalette, ColorsType, LightColors, DarkColors } from './color';
import { MMKVService } from '@/services';
import { StorageKeys } from '@/constants';

export type ThemesVariant = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemesVariant;
  colors: ColorsType;
  setTheme: (theme: ThemesVariant) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemesVariant>('light');

  const onSetTheme = useCallback((theme: ThemesVariant) => {
    if (!theme) {
      return;
    }

    setTheme(theme);
    MMKVService.setData(StorageKeys.APP_THEME, theme);
  }, []);

  const value: ThemeContextType = useMemo(() => {
    return {
      theme,
      setTheme: onSetTheme,
      colors: theme === 'light' ? LightColors : DarkColors,
    };
  }, [theme, onSetTheme]);

  useEffect(() => {
    const theme = MMKVService.getString(StorageKeys.APP_THEME) as ThemesVariant;
    if (theme) {
      onSetTheme(theme);
    } else {
      colorScheme && onSetTheme(colorScheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <View style={ColorPalette[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
