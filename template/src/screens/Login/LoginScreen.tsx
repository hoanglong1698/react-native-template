import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { reset, ScreenName } from '@/navigation';

const LoginScreen = () => {
  const onLogin = () => {
    reset(ScreenName.BottomTab);
  };

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <TouchableOpacity onPress={onLogin}>
        <Text className="text-textColor">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
