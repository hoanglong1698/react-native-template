import React, { createContext, useCallback, useMemo, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { ColorsType, LightColors, DarkColors, ColorPalette } from './color';

export enum ThemesVariant {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeContextType {
  theme: ThemesVariant;
  colors: ColorsType;
  setTheme: (theme: ThemesVariant) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemesVariant>(ThemesVariant.LIGHT);
  const isDark = theme === ThemesVariant.DARK;

  const setAppTheme = useCallback((newTheme: ThemesVariant) => {
    if (!newTheme) {
      return;
    }
    setTheme(newTheme);
  }, []);

  const value: ThemeContextType = useMemo(() => {
    return {
      theme,
      setTheme,
      colors: isDark ? DarkColors : LightColors,
    };
  }, [theme, setAppTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={ColorPalette[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
