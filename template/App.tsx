import './global.css';
import { ThemeProvider } from '@/contexts';
import { AppNavigation } from '@/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
