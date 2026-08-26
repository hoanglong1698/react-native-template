import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ModalComponentProp } from 'react-native-modalfy';
import { ColorsType, Fonts, Typography } from '@/constants';
import { scale, scaleRadius } from '@/helpers';
import { useThemedStyles } from '@/hooks';
import { ModalName, ModalStackParamsList } from '@/navigation';

export const AppLoadingModal: React.FC<ModalComponentProp<ModalStackParamsList, void, ModalName.AppLoading>> = ({
  modal: { getParam },
}) => {
  const styles = useThemedStyles(createStyles);
  const message = getParam('message');

  return (
    <View style={styles.card}>
      <ActivityIndicator size="large" color="#2563EB" />
      {Boolean(message) && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    card: {
      minWidth: scale(120),
      maxWidth: scale(220),
      backgroundColor: colors.background,
      borderRadius: scaleRadius(16),
      paddingVertical: scale(20),
      paddingHorizontal: scale(24),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: scale(10) },
      shadowOpacity: 0.15,
      shadowRadius: scale(20),
      elevation: 8,
    },
    message: {
      marginTop: scale(12),
      ...Typography.fs14,
      fontFamily: Fonts.Medium,
      color: colors.textDefault,
      textAlign: 'center',
    },
  });
};

export default AppLoadingModal;
