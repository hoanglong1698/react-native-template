import React from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';
import { ColorsType, Fonts, Typography } from '@/constants';
import { useThemedStyles } from '@/hooks';

export interface UITextProps extends RNTextProps {}

const UIText: React.FC<UITextProps> = ({ style, children, ...props }) => {
  const styles = useThemedStyles(createStyles);

  return (
    <RNText style={[styles.text, style]} {...props}>
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
