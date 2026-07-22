import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import { LoginScreen } from '@/screens';
import { NavStackParams, ScreenName } from './AppNavigation.types';
import BottomTabNavigator from './bottom-tab/BottomTabNavigator';

export const navigationRef = React.createRef<NavigationContainerRef<NavStackParams>>();

const Stack = createNativeStackNavigator();

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
