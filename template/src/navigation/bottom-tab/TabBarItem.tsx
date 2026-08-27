import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Fonts, Typography } from '@/constants';

interface Props {
  icon: string;
  label: string;
  color: string;
  focused: boolean;
}

const TabBarItem = ({ icon, label, color, focused }: Props) => {
  const { width: widthDevice } = useWindowDimensions();

  return (
    <View style={[styles.container, { width: widthDevice / 5 }]}>
      <Text allowFontScaling={false} style={{ color }}>
        {icon}
      </Text>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        style={[styles.label, focused && styles.labelFocused, { color }]}>
        {label}
      </Text>
    </View>
  );
};

export default TabBarItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  label: {
    ...Typography.fs10,
    fontFamily: Fonts.Regular,
  },
  labelFocused: {
    fontFamily: Fonts.SemiBold,
  },
});
