import React, { forwardRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { ColorsType, Fonts, Images, Typography } from '@/constants';
import { scale, scaleRadius } from '@/helpers';
import { useTheme, useThemedStyles } from '@/hooks';
import { UIImage } from '../UIImage';

interface UITextInputProps extends RNTextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
}

const UITextInput = forwardRef<RNTextInput, UITextInputProps>(
  ({ containerStyle, style, error, onFocus, onBlur, placeholderTextColor, secureTextEntry, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(Boolean(secureTextEntry));
    const { colors } = useTheme();
    const styles = useThemedStyles(createStyles);
    const hasError = Boolean(error);

    const handleFocus: RNTextInputProps['onFocus'] = e => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: RNTextInputProps['onBlur'] = e => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const toggleSecureEntry = () => {
      setIsSecure(prev => !prev);
    };

    return (
      <View>
        <View
          style={[styles.container, hasError && styles.containerError, isFocused && styles.focused, containerStyle]}>
          <RNTextInput
            ref={ref}
            secureTextEntry={secureTextEntry ? isSecure : false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={placeholderTextColor ?? colors.secondary}
            style={[styles.input, style]}
            {...props}
          />
          {Boolean(secureTextEntry) && (
            <TouchableOpacity activeOpacity={0.7} onPress={toggleSecureEntry} style={styles.eyeButton}>
              <UIImage source={isSecure ? Images.eyeOff : Images.eye} style={styles.eyeIcon} />
            </TouchableOpacity>
          )}
        </View>
        {hasError && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  },
);

export default UITextInput;

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.borderDefault,
      borderRadius: scaleRadius(8),
      paddingHorizontal: scale(16),
      paddingVertical: scale(12),
      backgroundColor: colors.background,
    },
    focused: {
      borderColor: colors.primary,
    },
    containerError: {
      borderColor: colors.red,
    },
    input: {
      flex: 1,
      padding: 0,
      fontFamily: Fonts.Regular,
      ...Typography.fs14,
      color: colors.textDefault,
    },
    eyeButton: {
      paddingLeft: scale(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    eyeIcon: {
      width: scale(20),
      height: scale(20),
      tintColor: colors.secondary,
    },
    errorText: {
      fontFamily: Fonts.Regular,
      ...Typography.fs12,
      color: colors.red,
      marginTop: scale(4),
    },
  });
};
