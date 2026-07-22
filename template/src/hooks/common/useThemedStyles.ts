import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { ColorsType } from '@/constants';
import { useTheme } from './useTheme';

export const useThemedStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  createStyles: (colors: ColorsType) => T,
) => {
  const { colors } = useTheme();

  const styles = useMemo(() => createStyles(colors), [createStyles, colors]);

  return styles;
};
