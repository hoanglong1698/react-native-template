import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cn } from '@/utils';

export interface UITextProps extends RNTextProps {
  className?: string;
}

const UIText: React.FC<UITextProps> = ({ className, children, ...props }) => {
  return (
    <RNText className={cn('font-regular text-14', className)} {...props}>
      {children}
    </RNText>
  );
};

export default UIText;
