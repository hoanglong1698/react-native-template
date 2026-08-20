import { DarkColors, LightColors, ThemesVariant } from '@/constants';
import { useAppPreferences } from '@/stores';

export const useTheme = () => {
  const theme = useAppPreferences(state => state.theme);
  const setTheme = useAppPreferences(state => state.setTheme);
  const colors = theme === ThemesVariant.DARK ? DarkColors : LightColors;

  return { theme, setTheme, colors };
};
