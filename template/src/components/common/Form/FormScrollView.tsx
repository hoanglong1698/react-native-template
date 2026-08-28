import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { FormState } from 'react-hook-form';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller';
import { ColorsType } from '@/constants';
import { FormScrollContext } from '@/contexts';
import { useThemedStyles } from '@/hooks';

const DEFAULT_SCROLL_OFFSET = 20;

interface FormScrollViewProps extends KeyboardAwareScrollViewProps {
  formState: FormState<any>;
  scrollOffset?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const FormScrollView: React.FC<FormScrollViewProps> = ({
  formState,
  scrollOffset = DEFAULT_SCROLL_OFFSET,
  contentContainerStyle,
  children,
  ...props
}) => {
  const styles = useThemedStyles(createStyles);
  const scrollViewRef = useRef<KeyboardAwareScrollViewRef>(null);
  const fieldPositionsRef = useRef<Map<string, number>>(new Map());

  const registerField = useCallback((name: string, y: number) => {
    fieldPositionsRef.current.set(name, y);
  }, []);

  const unregisterField = useCallback((name: string) => {
    fieldPositionsRef.current.delete(name);
  }, []);

  const contextValue = useMemo(() => ({ registerField, unregisterField }), [registerField, unregisterField]);

  useEffect(() => {
    if (formState.submitCount === 0) {
      return;
    }

    const errorKeys = Object.keys(formState.errors);
    if (errorKeys.length === 0) {
      return;
    }

    // Find the error field with the smallest Y position (topmost on screen)
    let targetY: number | null = null;

    for (const key of errorKeys) {
      const fieldY = fieldPositionsRef.current.get(key);
      if (fieldY !== undefined && (targetY === null || fieldY < targetY)) {
        targetY = fieldY;
      }
    }

    if (targetY !== null) {
      const scrollY = Math.max(0, targetY - scrollOffset);
      scrollViewRef.current?.scrollTo({ y: scrollY, animated: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.submitCount]);

  return (
    <FormScrollContext.Provider value={contextValue}>
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        {...props}>
        {children}
      </KeyboardAwareScrollView>
    </FormScrollContext.Provider>
  );
};

export default FormScrollView;

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    contentContainer: {
      flexGrow: 1,
    },
  });
};
