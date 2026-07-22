import { StyleSheet, Text, View, Switch } from 'react-native';
import React from 'react';
import { ColorsType, ThemesVariant } from '@/constants';
import { useThemedStyles, useTheme } from '@/hooks';
import { Header } from '@/components/common';

const ProfileScreen = () => {
  const { theme, setTheme } = useTheme();
  const styles = useThemedStyles(createStyles);

  const isDarkMode = theme === ThemesVariant.DARK;

  const toggleSwitch = (value: boolean) => {
    setTheme(value ? ThemesVariant.DARK : ThemesVariant.LIGHT);
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.contentContainer}>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleSwitch}
            trackColor={{ false: '#767577', true: '#857CD9' }}
            thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const createStyles = (colors: ColorsType) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.textColor,
      marginBottom: 30,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.secondary + '20',
      borderRadius: 8,
      marginBottom: 30,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.textColor,
      fontWeight: '500',
    },
  });
};
