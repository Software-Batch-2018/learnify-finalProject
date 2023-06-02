import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { Box, Button, Text } from 'native-base';
import React from 'react';

export default function ProfilePage({ navigation }: any) {
  const getData = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value === null) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [navigation]);

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

  React.useEffect(() => {
    getData();
  }, [getData, navigation]);
  return (
    <Box p={2}>
      <Text>Logged In</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
}
