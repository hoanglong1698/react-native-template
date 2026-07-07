import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { reset, ScreenName } from '@/navigation';

const LoginScreen = () => {
  const onLogin = () => {
    reset(ScreenName.BottomTab);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={onLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
