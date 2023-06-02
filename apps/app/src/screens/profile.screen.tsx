import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Button, Text } from 'native-base';
import React from 'react';

export default function ProfilePage({ navigation }: any) {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
  };
  const handleLogout = () => {
    clearAll().then(() => {
      navigation.replace('Login');
    });
  };

  return (
    <Box p={2}>
      <Text>Logged In</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
}
