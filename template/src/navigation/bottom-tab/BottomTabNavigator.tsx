import React from 'react';
import { HomeScreen, ProfileScreen } from '@/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenName } from '../AppNavigation.types';
import TabBarItem from './TabBarItem';
import { useTheme } from '@/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomTab = createBottomTabNavigator();

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
          tabBarIcon: ({ focused, color }) => <TabBarItem icon="🏠" label="Home" focused={focused} color={color} />,
        }}
      />
      <BottomTab.Screen
        name={ScreenName.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => <TabBarItem icon="👤" label="Profile" focused={focused} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
