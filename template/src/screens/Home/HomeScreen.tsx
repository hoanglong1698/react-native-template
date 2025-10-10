import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { navigate, ScreenName } from '@/navigation';

const HomeScreen = () => {
  const onPress = () => {
    navigate(ScreenName.Profile);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={onPress}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
