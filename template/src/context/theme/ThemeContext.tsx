import React, { createContext, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ColorPalette, ColorsType, LightColors, DarkColors } from './color';

export type ThemesVariant = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemesVariant;
  colors: ColorsType;
  setTheme: (theme: ThemesVariant) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemesVariant>('light');

  const setAppTheme = useCallback((theme: ThemesVariant) => {
    if (!theme) {
      return;
    }
    setTheme(theme);
  }, []);

  const value: ThemeContextType = useMemo(() => {
    return {
      theme,
      setTheme,
      colors: theme === 'light' ? LightColors : DarkColors,
    };
  }, [theme, setAppTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <View style={ColorPalette[theme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
