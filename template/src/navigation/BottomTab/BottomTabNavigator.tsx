import { HomeScreen, ProfileScreen } from '@/screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenName } from '../AppNavigation.types';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName={ScreenName.Home} screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name={ScreenName.Home} component={HomeScreen} />
      <BottomTab.Screen name={ScreenName.Profile} component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
