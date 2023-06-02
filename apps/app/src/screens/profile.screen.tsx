import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Button, Text } from 'native-base';
import React from 'react';
import { returnToken } from '../utils/auth.check';
import jwt_decode from 'jwt-decode';
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

  const [user, setUser] = React.useState<any>(undefined);

  React.useEffect(() => {
    returnToken().then((value) => {
      if (value != null) {
        const decoded = jwt_decode(value);
        setUser(decoded);
      }
    });
  }, []);

  return (
    <Box p={2}>
      <Text>Logged In</Text>
      {user && (
        <Box>
          <Text>{user.name}</Text>

          <Text>{user.email}</Text>
          <Text>{user.role}</Text>
        </Box>
      )}
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
}
