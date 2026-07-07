import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { goBack } from '@/navigation';

const ProfileScreen = () => {
  const onGoBack = () => goBack();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ProfileScreen</Text>

      <TouchableOpacity onPress={onGoBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
