import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks';
import { HomeScreen, ProfileScreen } from '@/screens';
import { ScreenName } from '../AppNavigation.types';
import TabBarItem from './TabBarItem';

const BottomTab = createBottomTabNavigator();

const renderTabBarIcon =
  (icon: string, label: string) =>
  ({ focused, color }: { focused: boolean; color: string }) => (
    <TabBarItem icon={icon} label={label} focused={focused} color={color} />
  );

const BottomTabNavigator = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      initialRouteName={ScreenName.Home}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 40 + insets.bottom,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}>
      <BottomTab.Screen
        name={ScreenName.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: renderTabBarIcon('🏠', 'Home'),
        }}
      />
      <BottomTab.Screen
        name={ScreenName.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: renderTabBarIcon('👤', 'Profile'),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
