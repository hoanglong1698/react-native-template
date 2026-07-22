import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { reset, ScreenName } from '@/navigation';
import { ColorsType } from '@/constants';
import { useThemedStyles } from '@/hooks';

const LoginScreen = () => {
  const styles = useThemedStyles(createStyles);
  const onLogin = () => {
    reset(ScreenName.BottomTab);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onLogin}>
        <Text style={styles.label}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    label: {
      color: colors.textColor,
    },
  });
};
