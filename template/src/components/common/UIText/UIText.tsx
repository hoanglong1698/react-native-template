import React from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';
import { ColorsType, Fonts, Typography } from '@/constants';
import { extractTypographyModifiers, TypographyModifiers } from '@/helpers';
import { useThemedStyles } from '@/hooks';

interface UITextProps extends RNTextProps, TypographyModifiers {}

const UIText: React.FC<UITextProps> = ({ style, children, ...props }) => {
  const styles = useThemedStyles(createStyles);
  const { typographyStyle, cleanProps } = extractTypographyModifiers(props);

  return (
    <RNText style={[styles.text, typographyStyle, style]} {...cleanProps}>
      {children}
    </RNText>
  );
};

const createStyles = (colors: ColorsType) =>
  StyleSheet.create({
    text: {
      fontFamily: Fonts.Regular,
      ...Typography.fs14,
      color: colors.textDefault,
    },
  });

export default UIText;
