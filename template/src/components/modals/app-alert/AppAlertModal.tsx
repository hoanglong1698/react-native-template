import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ModalComponentProp } from 'react-native-modalfy';
import { ColorsType, FONTS } from '@/constants';
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
      width: Math.min(SCREEN_WIDTH - 48, 340),
      backgroundColor: colors.background,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingTop: 24,
      paddingBottom: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconText: {
      fontSize: 22,
      fontFamily: FONTS.BOLD,
    },
    title: {
      fontSize: 18,
      fontFamily: FONTS.BOLD,
      color: colors.textDefault,
      textAlign: 'center',
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      fontFamily: FONTS.REGULAR,
      color: colors.textDefault,
      opacity: 0.8,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      width: '100%',
      gap: 12,
      marginTop: 4,
    },
    button: {
      flex: 1,
      height: 44,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: colors.secondary + '20',
      borderWidth: 1,
      borderColor: colors.borderDefault,
    },
    cancelButtonText: {
      fontSize: 15,
      fontFamily: FONTS.SEMI_BOLD,
      color: colors.textDefault,
    },
    confirmButton: {
      backgroundColor: '#2563EB',
    },
    confirmButtonText: {
      fontSize: 15,
      fontFamily: FONTS.SEMI_BOLD,
      color: '#FFFFFF',
    },
  });
};

export default AppAlertModal;
