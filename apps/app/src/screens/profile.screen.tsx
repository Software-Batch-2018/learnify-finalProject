import {
  Box,
  HStack,
  VStack,
  Text,
  Icon,
  Center,
  ScrollView,
} from 'native-base';
import { StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { returnToken } from '../utils/auth.check';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../components/AuthProvider';
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const screenHeight = Dimensions.get('window').height;
const image = { uri: 'https://i.ibb.co/7J0zQtN/1521986151.png' };
export default function ProfilePage({ navigation }: any) {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout().then(() => {
      return navigation.replace('Login');
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
    <ScrollView>
      <Box p={4} pt={10} bg={'white'} h={screenHeight - 60}>
        <VStack>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            {user && (
              <Text fontSize={'2xl'} bold>
                Hello, <Text>{user.name}</Text>
              </Text>
            )}
            <VStack bg={'blue.100'} m={1} p={2} borderRadius={20}>
              <Center>
                <Icon
                  onPress={handleLogout}
                  mr={3}
                  size={29}
                  as={<AntDesign name="logout" />}
                />
                <Text>Logout</Text>
              </Center>
            </VStack>
          </HStack>
          <Text fontSize={'2xl'} mt={10}>
            Find Contents easily and get learning with
          </Text>
          <Text fontSize={'3xl'} bold color={'emerald.500'}>
            Learnify
          </Text>
          <Text fontSize={'md'} color={'coolGray.500'}>
            Discover 200+ Materials and constantly increasing
          </Text>
          <Center>
            <Box height="150" w={'80%'} mt={6}>
              <ImageBackground
                source={image}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          </Center>
          <Center mt={10}>
            <Text fontSize={'2xl'}>View your Quiz History</Text>
          </Center>
          <Center>
            <HStack>
              <TouchableOpacity
                onPress={() => navigation.navigate('QuizHistory')}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Overall</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('IndividualHistory')}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Individual</Text>
              </TouchableOpacity>
            </HStack>
          </Center>
        </VStack>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    width: 150,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
