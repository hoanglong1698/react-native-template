import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { AppBottomSheetModal, BottomSheetModal, Header } from '@/components/common';
import { ColorsType, Fonts, LanguageVariant, ThemesVariant, Typography } from '@/constants';
import { AppAlertHelper, AppLoadingHelper } from '@/helpers';
import { useTheme, useThemedStyles } from '@/hooks';
import { useTranslation } from '@/i18n';
import { useAppPreferences } from '@/stores';

const DUMMY_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i + 1}`,
  title: `Item danh sách số ${i + 1}`,
  description: `Mô tả chi tiết hiển thị trong BottomSheetFlatList ${i + 1}`,
}));

const ProfileScreen = () => {
  const { theme, setTheme, colors } = useTheme();
  const { language, setLanguage } = useAppPreferences();
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  const dynamicSheetRef = useRef<BottomSheetModal>(null);
  const snapPointsSheetRef = useRef<BottomSheetModal>(null);
  const scrollableSheetRef = useRef<BottomSheetModal>(null);

  const multiSnapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const scrollSnapPoints = useMemo(() => ['50%', '90%'], []);

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
      <ScrollView contentContainerStyle={styles.contentContainer}>
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

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Demo BottomSheetModal</Text>

        {/* Demo 1: Dynamic Sizing */}
        <TouchableOpacity
          style={[styles.demoButton, styles.demoDynamicButton]}
          onPress={() => dynamicSheetRef.current?.present()}>
          <Text style={styles.demoButtonText}>1. Demo Dynamic Sizing (Mặc định)</Text>
        </TouchableOpacity>

        {/* Demo 2: Fixed SnapPoints */}
        <TouchableOpacity
          style={[styles.demoButton, styles.demoSnapButton]}
          onPress={() => snapPointsSheetRef.current?.present()}>
          <Text style={styles.demoButtonText}>2. Demo SnapPoints (25%, 50%, 90%)</Text>
        </TouchableOpacity>

        {/* Demo 3: Scrollable FlatList */}
        <TouchableOpacity
          style={[styles.demoButton, styles.demoScrollButton]}
          onPress={() => scrollableSheetRef.current?.present()}>
          <Text style={styles.demoButtonText}>3. Demo FlatList (useBottomSheetView=false)</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 1. Modal Dynamic Sizing (Mặc định) */}
      <AppBottomSheetModal ref={dynamicSheetRef} title="1. Dynamic Sizing">
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>
            useBottomSheetView = true & enableDynamicSizing = true
          </Text>
          <Text style={styles.sheetDesc}>
            Modal tự động đo lường và ôm vừa khít chiều cao nội dung. Thích hợp cho form ngắn, dialog xác nhận, action
            menu.
          </Text>
          <TouchableOpacity
            style={[styles.demoButton, { backgroundColor: colors.primary }]}
            onPress={() => dynamicSheetRef.current?.dismiss()}>
            <Text style={styles.demoButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </AppBottomSheetModal>

      {/* 2. Modal SnapPoints cố định / nhiều nấc */}
      <AppBottomSheetModal
        ref={snapPointsSheetRef}
        title="2. Multi SnapPoints (25%, 50%, 90%)"
        enableDynamicSizing={false}
        snapPoints={multiSnapPoints}>
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>
            enableDynamicSizing = false & snapPoints = ['25%', '50%', '90%']
          </Text>
          <Text style={styles.sheetDesc}>
            Modal dừng ở 3 nấc cố định (25%, 50%, 90% màn hình). Người dùng có thể kéo qua lại giữa các nấc.
          </Text>
          <TouchableOpacity
            style={[styles.demoButton, { backgroundColor: '#F59E0B' }]}
            onPress={() => snapPointsSheetRef.current?.dismiss()}>
            <Text style={styles.demoButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </AppBottomSheetModal>

      {/* 3. Modal Scrollable với BottomSheetFlatList */}
      <AppBottomSheetModal
        ref={scrollableSheetRef}
        title="3. Scrollable List"
        enableDynamicSizing={false}
        useBottomSheetView={false}
        snapPoints={scrollSnapPoints}>
        <BottomSheetFlatList
          data={DUMMY_DATA}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={[styles.listItem, { borderBottomColor: colors.borderDefault }]}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          )}
        />
      </AppBottomSheetModal>
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
      paddingBottom: 40,
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
    demoDynamicButton: {
      backgroundColor: '#10B981',
    },
    demoSnapButton: {
      backgroundColor: '#F59E0B',
    },
    demoScrollButton: {
      backgroundColor: '#8B5CF6',
    },
    demoButtonText: {
      color: '#ffffff',
      fontWeight: '600',
      fontSize: 15,
    },
    divider: {
      height: 1,
      backgroundColor: colors.borderDefault,
      marginVertical: 20,
    },
    sectionTitle: {
      ...Typography.fs16,
      fontFamily: Fonts.Bold,
      color: colors.textDefault,
      marginBottom: 8,
    },
    sheetContent: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    sheetTitle: {
      ...Typography.fs16,
      fontFamily: Fonts.SemiBold,
      color: colors.textDefault,
      marginBottom: 12,
    },
    sheetDesc: {
      ...Typography.fs14,
      fontFamily: Fonts.Regular,
      color: colors.textDefault,
      lineHeight: 20,
      marginBottom: 16,
    },
    flatListContent: {
      paddingHorizontal: 20,
      paddingBottom: 24,
    },
    listItem: {
      paddingVertical: 12,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemTitle: {
      ...Typography.fs14,
      fontFamily: Fonts.Bold,
      color: colors.textDefault,
      marginBottom: 2,
    },
    itemDescription: {
      ...Typography.fs12,
      fontFamily: Fonts.Regular,
      color: colors.secondary,
    },
  });
};
