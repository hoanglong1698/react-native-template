import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { goBack } from '@/navigation';
import { useTheme, useThemedStyles } from '@/hooks';
import { ColorsType } from '@/context';

const ProfileScreen = () => {
  const onGoBack = () => goBack();
  const styles = useThemedStyles(createStyles);
  const { theme, setTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>

      <TouchableOpacity onPress={onGoBack} style={styles.backButton} accessibilityRole="button">
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>

      <Button title="Light" onPress={() => setTheme('light')} color={theme === 'light' ? '#857CD9' : '#8A8AA8'} />
      <Button title="Dark" onPress={() => setTheme('dark')} color={theme === 'dark' ? '#857CD9' : '#8A8AA8'} />
    </View>
  );
};

export default ProfileScreen;

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    title: {
      color: colors.textColor,
      fontSize: 18,
      marginBottom: 12,
      fontWeight: '600',
    },
    backButton: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    backText: {
      color: colors.primary,
      fontWeight: '600',
    },
  });
};
