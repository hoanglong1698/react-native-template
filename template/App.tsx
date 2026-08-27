import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ModalProvider } from 'react-native-modalfy';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemesVariant } from './src/constants';
import { modalStack } from './src/navigation';
import AppNavigation from './src/navigation/AppNavigation';
import { queryClient } from './src/services/query-client';
import { useAppPreferences, useAuthStore } from './src/stores';

function App() {
  const theme = useAppPreferences(state => state.theme);
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const isDark = theme === ThemesVariant.DARK;

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={styles.root}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <SafeAreaProvider>
          <KeyboardProvider>
            <BottomSheetModalProvider>
              <ModalProvider stack={modalStack}>
                <AppNavigation />
              </ModalProvider>
            </BottomSheetModalProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
