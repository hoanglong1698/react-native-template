import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '@/components/common';
import { ColorsType, LanguageVariant, ThemesVariant } from '@/constants';
import { AppAlertHelper, AppLoadingHelper } from '@/helpers';
import { useTheme, useThemedStyles } from '@/hooks';
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
    const nextLang = language === LanguageVariant.EN ? LanguageVariant.VI : LanguageVariant.EN;
    setLanguage(nextLang);
  };

  const handleShowLoading = () => {
    AppLoadingHelper.show('Đang tải dữ liệu (2s)...');
    setTimeout(() => {
      AppLoadingHelper.hide();
    }, 2000);
  };

  const handleShowAlert = () => {
    AppAlertHelper.show({
      title: 'Demo App Alert',
      description: 'Đây là modal alert được gọi từ AppAlertHelper.',
      type: 'info',
      confirmText: 'Xác nhận',
      cancelText: 'Hủy',
      onConfirm: () => {
        console.log('AppAlert confirmed');
      },
      onCancel: () => {
        console.log('AppAlert cancelled');
      },
    });
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
              {language === LanguageVariant.EN ? t('common.english') : t('common.vietnamese')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Demo Loading Button */}
        <TouchableOpacity style={styles.demoButton} onPress={handleShowLoading}>
          <Text style={styles.demoButtonText}>Demo App Loading (2s)</Text>
        </TouchableOpacity>

        {/* Demo Alert Button */}
        <TouchableOpacity style={[styles.demoButton, styles.demoAlertButton]} onPress={handleShowAlert}>
          <Text style={styles.demoButtonText}>Demo App Alert</Text>
        </TouchableOpacity>
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
      color: colors.textDefault,
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
      color: colors.textDefault,
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
    demoButton: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
    },
    demoAlertButton: {
      backgroundColor: '#2563EB',
    },
    demoButtonText: {
      color: '#ffffff',
      fontWeight: '600',
      fontSize: 15,
    },
  });
};
