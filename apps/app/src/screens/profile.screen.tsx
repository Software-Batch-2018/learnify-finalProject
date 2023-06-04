import {
  Badge,
  Box,
  Button,
  HStack,
  Pressable,
  Spacer,
  Text,
} from 'native-base';
import React, { useContext } from 'react';
import { returnToken } from '../utils/auth.check';
import jwt_decode from 'jwt-decode';
import { InfoBox } from '../components/info';
import { AuthContext } from '../components/AuthProvider';
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
    <Box p={2}>
      <Box alignItems="center">
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
      </Box>
    </Box>
  );
}
