import './global.css';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppPreferences, useAuthStore } from './src/stores';
import { ColorPalette, ThemesVariant } from './src/constants';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/services/query-client';

function App() {
  const theme = useAppPreferences(state => state.theme);
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const isDark = theme === ThemesVariant.DARK;

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView className="flex-1">
        <View style={ColorPalette[theme]} className="flex-1">
          <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
          <SafeAreaProvider>
            <KeyboardProvider>
              <AppNavigation />
            </KeyboardProvider>
          </SafeAreaProvider>
        </View>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
