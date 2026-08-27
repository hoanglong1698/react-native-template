import { TextStyle } from 'react-native';
import { Typography } from '@/constants/typography';

export type TypographyModifiers = {
  [K in keyof typeof Typography]?: boolean;
};

/**
 * Extracts typography modifiers (font size, font weight, line height, font family)
 * from component props and returns both the merged TextStyle and the cleaned props.
 */
export function extractTypographyModifiers<T extends Record<string, any>>(
  props: T,
): {
  typographyStyle: TextStyle;
  cleanProps: Omit<T, keyof typeof Typography>;
} {
  const typographyStyle: TextStyle = {};
  const cleanProps: Record<string, any> = {};

  for (const [key, value] of Object.entries(props)) {
    if (Typography && key in Typography) {
      if (value) {
        Object.assign(typographyStyle, Typography[key as keyof typeof Typography]);
      }
    } else {
      cleanProps[key] = value;
    }
  }

  return {
    typographyStyle,
    cleanProps: cleanProps as Omit<T, keyof typeof Typography>,
  };
}
