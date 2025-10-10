import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { navigate, ScreenName } from '@/navigation';
import { axiosAPI } from '@/services/api';

const HomeScreen = () => {
  const onPress = () => {
    navigate(ScreenName.Profile);
  };

  const fetchData = async () => {
    try {
      const response = await axiosAPI.get('/posts', { skip_auth: true });
      console.log(response.data);
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
