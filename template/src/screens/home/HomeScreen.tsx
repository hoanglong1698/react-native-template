import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { navigate, ScreenName } from '@/navigation';
import { Header } from '@/components/common';

const HomeScreen = () => {
  const onPress = () => {
    navigate(ScreenName.Profile);
  };

  return (
    <View className="flex-1 bg-background">
      <Header title="Home" />
      <View className="p-5">
        <TouchableOpacity onPress={onPress}>
          <Text className="text-textColor">Go to profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
