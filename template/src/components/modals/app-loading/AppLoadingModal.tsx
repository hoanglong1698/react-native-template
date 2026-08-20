import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ModalComponentProp } from 'react-native-modalfy';
import { ColorsType, FONTS } from '@/constants';
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
      minWidth: 120,
      maxWidth: 220,
      backgroundColor: colors.background,
      borderRadius: 16,
      paddingVertical: 20,
      paddingHorizontal: 24,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
    },
    message: {
      marginTop: 12,
      fontSize: 14,
      fontFamily: FONTS.MEDIUM,
      color: colors.textDefault,
      textAlign: 'center',
    },
  });
};

export default AppLoadingModal;
