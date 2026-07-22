import './global.css';
import { StatusBar, View } from 'react-native';
import { AppNavigation } from '@/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppPreferences } from '@/stores';
import { ColorPalette, ThemesVariant } from '@/constants';

function App() {
  const theme = useAppPreferences(state => state.theme);
  const isDark = theme === ThemesVariant.DARK;

  return (
    <GestureHandlerRootView className="flex-1">
      <View style={ColorPalette[theme]} className="flex-1">
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </View>
    </GestureHandlerRootView>
  );
}

export default App;
