import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UITextInput } from '@/components';
import { ColorsType, Typography } from '@/constants';
import { useLogin, useThemedStyles } from '@/hooks';

const LoginScreen = () => {
  const styles = useThemedStyles(createStyles);
  const [username, setUsername] = useState('john_doe');
  const [password, setPassword] = useState('123456');

  const { mutate: login, isPending, isError, error } = useLogin();

  const onLogin = () => {
    login({ username, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <UITextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <UITextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

      {isError && <Text style={styles.errorText}>{error?.message || 'Login failed. Please try again.'}</Text>}

      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={onLogin}
        disabled={isPending}>
        {isPending ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    title: {
      ...Typography.fs24,
      ...Typography.fw700,
      color: colors.textDefault,
      marginBottom: 32,
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      ...StyleSheet.flatten([Typography.fs14]),
      color: colors.textDefault,
      marginBottom: 8,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 16,
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    errorText: {
      color: '#ef4444',
      marginBottom: 12,
      textAlign: 'center',
    },
  });
};
