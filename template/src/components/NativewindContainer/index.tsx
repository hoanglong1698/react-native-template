import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ColorVars, SizeVars, TypographyVars } from '@/constants';
import { useAppPreferences } from '@/stores';

const NativewindContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useAppPreferences(state => state.theme);

  return (
    <View style={[ColorVars[theme], TypographyVars, SizeVars]} className="flex-1">
      {children}
    </View>
  );
};

export default NativewindContainer;
