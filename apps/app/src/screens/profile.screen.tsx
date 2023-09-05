import {
  Badge,
  Box,
  Button,
  HStack,
  VStack,
  Pressable,
  Spacer,
  Text,
  Icon,
  Center,
} from 'native-base';
import { StyleSheet } from "react-native";
import React, { useContext } from 'react';
import { returnToken } from '../utils/auth.check';
import jwt_decode from 'jwt-decode';
import { InfoBox } from '../components/info';
import { AuthContext } from '../components/AuthProvider';
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const screenHeight = Dimensions.get('window').height;
const image = { uri: "https://i.ibb.co/7J0zQtN/1521986151.png" };
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
    <Box p={4} pt={10} bg={'white'} h={screenHeight - 60}>
      <VStack>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          {user && (<Text fontSize={'3xl'} bold> Hello, <Text>{user.name}</Text></Text>)}
          <Icon
            onPress={handleLogout}
            mr={3}
            size={29}
            as={<AntDesign name="logout" />}
          />
        </HStack>
        <Text fontSize={'5xl'} mt={10}>Find Contents</Text>
        <Text fontSize={'3xl'}>easily and get learning with </Text>
        <Text fontSize={'4xl'} bold underline color={'emerald.500'}>Learnify</Text>
        <Center><Text fontSize={'md'} color={'coolGray.500'}>Discover 200+ Materials and constantly increasing</Text></Center>
        <Center>
          <Box
            height="150"
            w={'80%'}
            mt={4}
            mb={5}
          >
            <ImageBackground source={image} style={{ width: '100%', height: '100%' }} />

          </Box>
        </Center>
        <Center mt={10}><Text fontSize={'2xl'}>View your Quiz History</Text></Center>
        <Center>
          <HStack>
            <TouchableOpacity onPress={() => navigation.navigate('QuizHistory')} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Overall</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('IndividualHistory')} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Individual</Text>
            </TouchableOpacity>
          </HStack>
        </Center>
      </VStack>
      {/*<Box alignItems="center">
        <Box
          rounded="8"
          overflow="hidden"
          borderWidth="1"
          borderColor="coolGray.300"
          maxW="96"
          shadow="3"
          bg="coolGray.100"
          p="5"
        >
          <Box>
            <HStack alignItems="center">
              {user && (
                <Text fontSize={15} color="coolGray.800">
                  Hello <Text color={'blue.400'}>{user.name}</Text>
                </Text>
              )}
              <Spacer />
              <Pressable onPress={handleLogout}>
                <Badge
                  colorScheme="darkBlue"
                  _text={{
                    color: 'white',
                  }}
                  variant="solid"
                  rounded="4"
                >
                  Logout
                </Badge>
              </Pressable>
            </HStack>
            <Text color="green.500" mt="3" fontWeight="medium" fontSize="xl">
              Welcome to Learnify!
            </Text>
            <Text mt="2" fontSize="sm" color="coolGray.700">
              Your one-stop destination to learn, discuss, and play quizzes.
              Join our vibrant community of learners and embark on a journey of
              intellectual growth and endless possibilities.
            </Text>
          </Box>
        </Box>
      </Box>
      <Box mt={2}>
        <InfoBox
          title="Quiz History"
          description="Comprehensive log of your past quiz attempts and performance records."
        >
          <Button
            mt={2}
            alignItems={'flex-end'}
            onPress={() => navigation.navigate('QuizHistory')}
            size={'sm'}
          >
            View History
          </Button>
        </InfoBox>
                </Box>*/}
    </Box>
  );
}

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin:10,
    width: 150,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
