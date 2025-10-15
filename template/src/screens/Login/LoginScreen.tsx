import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { reset, ScreenName } from '@/navigation';
import { useTheme } from '@/hooks';

const LoginScreen = () => {
  const onLogin = () => {
    reset(ScreenName.BottomTab);
  };

  const { theme, setTheme } = useTheme();

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <TouchableOpacity onPress={onLogin}>
        <Text className="text-textColor">Login {theme}</Text>
      </TouchableOpacity>

      <Button title="Light" onPress={() => setTheme('light')} color={theme === 'light' ? '#857CD9' : '#8A8AA8'} />
      <Button title="Dark" onPress={() => setTheme('dark')} color={theme === 'dark' ? '#857CD9' : '#8A8AA8'} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
