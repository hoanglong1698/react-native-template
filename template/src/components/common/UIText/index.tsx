import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import clsx from 'clsx';

export interface UITextProps extends RNTextProps {
  className?: string;
}

const UIText: React.FC<UITextProps> = ({ className, children, ...props }) => {
  return (
    <RNText className={clsx('font-regular text-14', className)} {...props}>
      {children}
    </RNText>
  );
};

export default UIText;
