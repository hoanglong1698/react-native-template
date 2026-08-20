import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { LoginScreen } from '@/screens';
import { NavStackParams, ScreenName } from './AppNavigation.types';
import BottomTabNavigator from './bottom-tab/BottomTabNavigator';
import { navigationRef } from './navigation-ref';

const Stack = createNativeStackNavigator<NavStackParams>();

const AppNavigation = () => {
  const onReady = () => {
    BootSplash.hide({ fade: true });
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <Stack.Navigator initialRouteName={ScreenName.Login} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ScreenName.Login} component={LoginScreen} />
        <Stack.Screen name={ScreenName.BottomTab} component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
