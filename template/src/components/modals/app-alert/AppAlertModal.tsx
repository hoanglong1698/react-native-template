import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ModalComponentProp } from 'react-native-modalfy';
import { ColorsType, Fonts, Typography } from '@/constants';
import { scale, scaleRadius } from '@/helpers';
import { useThemedStyles } from '@/hooks';
import { AppAlertModalType, ModalName, ModalStackParamsList } from '@/navigation';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TYPE_COLORS: Record<AppAlertModalType, string> = {
  info: '#2563EB',
  success: '#16A34A',
  warning: '#D97706',
  error: '#DC2626',
};

const TYPE_BADGE_BG: Record<AppAlertModalType, string> = {
  info: '#EFF6FF',
  success: '#F0FDF4',
  warning: '#FFFBEB',
  error: '#FEF2F2',
};

const TYPE_ICONS: Record<AppAlertModalType, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '!',
  error: '✕',
};

export const AppAlertModal: React.FC<ModalComponentProp<ModalStackParamsList, void, ModalName.AppAlert>> = ({
  modal: { closeModal, getParam },
}) => {
  const styles = useThemedStyles(createStyles);
  const title = getParam('title');
  const description = getParam('description');
  const confirmText = getParam('confirmText', 'Xác nhận');
  const cancelText = getParam('cancelText', 'Hủy');
  const onConfirm = getParam('onConfirm');
  const onCancel = getParam('onCancel');
  const type: AppAlertModalType = getParam('type', 'info') || 'info';

  const showCancelButton = Boolean(onCancel || getParam('cancelText'));

  const handleConfirm = () => {
    closeModal(ModalName.AppAlert, () => {
      onConfirm?.();
    });
  };

  const handleCancel = () => {
    closeModal(ModalName.AppAlert, () => {
      onCancel?.();
    });
  };

  const activeColor = TYPE_COLORS[type] || TYPE_COLORS.info;
  const activeBg = TYPE_BADGE_BG[type] || TYPE_BADGE_BG.info;
  const icon = TYPE_ICONS[type] || TYPE_ICONS.info;

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: activeBg }]}>
        <Text style={[styles.iconText, { color: activeColor }]}>{icon}</Text>
      </View>

      {Boolean(title) && <Text style={styles.title}>{title}</Text>}

      {Boolean(description) && <Text style={styles.description}>{description}</Text>}

      <View style={styles.buttonContainer}>
        {showCancelButton && (
          <TouchableOpacity activeOpacity={0.7} style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>{cancelText}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, styles.confirmButton, { backgroundColor: activeColor }]}
          onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    card: {
      width: Math.min(SCREEN_WIDTH - scale(48), scale(340)),
      backgroundColor: colors.background,
      borderRadius: scaleRadius(16),
      paddingHorizontal: scale(20),
      paddingTop: scale(24),
      paddingBottom: scale(20),
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: scale(10) },
      shadowOpacity: 0.15,
      shadowRadius: scale(20),
      elevation: 8,
    },
    iconContainer: {
      width: scale(48),
      height: scale(48),
      borderRadius: scaleRadius(24),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scale(16),
    },
    iconText: {
      ...Typography.fs24,
      fontFamily: Fonts.Bold,
    },
    title: {
      ...Typography.fs18,
      fontFamily: Fonts.Bold,
      color: colors.textDefault,
      textAlign: 'center',
      marginBottom: scale(8),
    },
    description: {
      ...Typography.fs14,
      fontFamily: Fonts.Regular,
      color: colors.textDefault,
      opacity: 0.8,
      textAlign: 'center',
      marginBottom: scale(20),
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      gap: scale(12),
      marginTop: scale(4),
    },
    button: {
      flex: 1,
      height: scale(44),
      borderRadius: scaleRadius(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: colors.secondary + '20',
      borderWidth: 1,
      borderColor: colors.borderDefault,
    },
    cancelButtonText: {
      ...Typography.fs14,
      fontFamily: Fonts.SemiBold,
      color: colors.textDefault,
    },
    confirmButton: {
      backgroundColor: '#2563EB',
    },
    confirmButtonText: {
      ...Typography.fs14,
      fontFamily: Fonts.SemiBold,
      color: '#FFFFFF',
    },
  });
};

export default AppAlertModal;
