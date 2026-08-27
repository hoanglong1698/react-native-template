import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ColorsType, Fonts, Typography } from '@/constants';
import { scale, scaleRadius } from '@/helpers';
import { useThemedStyles } from '@/hooks';

export interface AppBottomSheetModalProps extends Partial<BottomSheetModalProps> {
  children?: React.ReactNode;
  title?: string;
  useBottomSheetView?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const AppBottomSheetModal = forwardRef<BottomSheetModal, AppBottomSheetModalProps>(
  (
    {
      children,
      title,
      enableDynamicSizing = true,
      useBottomSheetView = true,
      contentContainerStyle,
      backdropComponent,
      ...restProps
    },
    ref,
  ) => {
    const styles = useThemedStyles(createStyles);
    const insets = useSafeAreaInsets();
    const bottomPadding = Math.max(insets.bottom, 16);

    const TView = useBottomSheetView ? BottomSheetView : View;

    const internalRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => internalRef.current as BottomSheetModal, []);

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => {
        if (!!backdropComponent && React.isValidElement(backdropComponent)) {
          return backdropComponent;
        }

        return (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
        );
      },
      [backdropComponent],
    );

    const renderHeader = () => {
      if (!title) {
        return null;
      }

      return (
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      );
    };

    return (
      <BottomSheetModal
        ref={internalRef}
        enablePanDownToClose
        enableDynamicSizing={enableDynamicSizing}
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handleIndicator}
        {...restProps}>
        <TView style={[{ paddingBottom: bottomPadding }, contentContainerStyle]}>
          {renderHeader()}
          {children}
        </TView>
      </BottomSheetModal>
    );
  },
);

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.background,
    },
    handleIndicator: {
      backgroundColor: colors.secondary,
      width: scale(40),
      height: scale(4),
      borderRadius: scaleRadius(2),
    },
    headerContainer: {
      alignItems: 'center',
      paddingVertical: scale(12),
    },
    titleContainer: {
      flex: 1,
      paddingRight: scale(8),
    },
    title: {
      ...Typography.fs16,
      fontFamily: Fonts.SemiBold,
      color: colors.textDefault,
    },
    closeButton: {
      padding: scale(4),
    },
  });
};

export default AppBottomSheetModal;
