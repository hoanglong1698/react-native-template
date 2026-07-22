import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { navigate, ScreenName } from '@/navigation';
import { Header } from '@/components/common';
import { useTranslation, translate } from '@/i18n';

// Example of translating outside a React component
const logWelcomeMessage = () => {
  const message = translate('common.welcome');
  console.log('Non-component translate example:', message);
};

const HomeScreen = () => {
  const { t } = useTranslation();

  const onPress = () => {
    logWelcomeMessage();
    navigate(ScreenName.Profile);
  };

  return (
    <View className="flex-1 bg-background">
      <Header title={t('home.title')} />
      <View className="p-5 gap-4">
        <Text className="text-textColor text-lg font-semibold">
          {t('home.subtitle')}
        </Text>

        <TouchableOpacity
          onPress={onPress}
          className="p-3 bg-card rounded-lg border border-border items-center"
        >
          <Text className="text-textColor font-medium">{t('home.goToProfile')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
