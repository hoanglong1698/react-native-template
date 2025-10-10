import { AppNavigation } from '@/navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
}

export default App;
