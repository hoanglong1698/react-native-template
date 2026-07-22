import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import React from 'react';
import { ColorsType, LanguageVariant, ThemesVariant } from '@/constants';
import { useThemedStyles, useTheme } from '@/hooks';
import { Header } from '@/components/common';
import { useTranslation } from '@/i18n';
import { useAppPreferences } from '@/stores';

const ProfileScreen = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useAppPreferences();
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  const isDarkMode = theme === ThemesVariant.DARK;

  const toggleThemeSwitch = (value: boolean) => {
    setTheme(value ? ThemesVariant.DARK : ThemesVariant.LIGHT);
  };

  const toggleLanguage = () => {
    const nextLang =
      language === LanguageVariant.EN ? LanguageVariant.VI : LanguageVariant.EN;
    setLanguage(nextLang);
  };

  return (
    <View style={styles.container}>
      <Header title={t('profile.title')} />
      <View style={styles.contentContainer}>
        {/* Dark Mode Setting */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{t('common.theme')} (Dark)</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleThemeSwitch}
            trackColor={{ false: '#767577', true: '#857CD9' }}
            thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
          />
        </View>

        {/* Language Setting */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{t('common.changeLanguage')}</Text>
          <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
            <Text style={styles.langButtonText}>
              {language === LanguageVariant.EN
                ? t('common.english')
                : t('common.vietnamese')}
            </Text>
          </TouchableOpacity>
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
      marginBottom: 16,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.textColor,
      fontWeight: '500',
    },
    langButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    langButtonText: {
      color: '#ffffff',
      fontWeight: '600',
      fontSize: 14,
    },
  });
};
