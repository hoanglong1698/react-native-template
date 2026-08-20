import './global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ModalProvider } from 'react-native-modalfy';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativewindContainer } from './src/components';
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
      <GestureHandlerRootView>
        <NativewindContainer>
          <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
          <SafeAreaProvider>
            <KeyboardProvider>
              <ModalProvider stack={modalStack}>
                <AppNavigation />
              </ModalProvider>
            </KeyboardProvider>
          </SafeAreaProvider>
        </NativewindContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
