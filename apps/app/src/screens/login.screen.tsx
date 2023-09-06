import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { loginUser } from '../query/user';
import React from 'react';
import { AuthContext } from '../components/AuthProvider';
import { ImageBackground, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const image = {
  uri: 'https://i.ibb.co/zJF1mBy/Pngtree-an-old-bookcase-in-a-2760144.jpg',
};
export function AccountScreen({ navigation }: any) {
  const { handleSubmit, control } = useForm();

  const [error, setError] = React.useState({
    status: false,
    message: '',
  });

  const { mutate, data, isLoading } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await loginUser(payload);
      if (data.error) {
        setError({
          status: true,
          message: data.message,
        });
      } else {
        setError({
          status: false,
          message: '',
        });
      }
      return data;
    },
  });

  const onSubmit = (formData: any) => {
    formData.email = formData.email.toLowerCase();
    mutate(formData);
  };

  const { login, isAuth } = React.useContext(AuthContext);
  React.useEffect(() => {
    if (data && data.token) {
      login(data.token);
      navigation.replace('Profile');
    }
    if (isAuth) {
      navigation.replace('Profile');
    }
  }, [data, isAuth, login, navigation]);

  return (
    <ImageBackground source={image}>
      <Box height={screenHeight - 60}>
        <Center h={'20%'}>
          <Heading fontSize={'5xl'} color={'white'}>
            Login
          </Heading>
        </Center>
        <Box bg={'white'} borderTopLeftRadius={'150'}>
          <Box w="100%" h={'80%'}>
            <Box safeArea p="2" w="100%">
              <Center>
                <Heading mt={7} pb={4} color={'black'} fontSize={'2xl'}>
                  Welcome to
                  <Text color="emerald.500"> Learnify</Text>
                </Heading>
                <Heading
                  mt="1"
                  mb={2}
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  color="coolGray.600"
                  fontWeight="medium"
                  size="xs"
                >
                  Sign in to continue!
                </Heading>
              </Center>
              <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <Center>
                  <VStack space={3} mt="5">
                    <FormControl w={'80'}>
                      <FormControl.Label>Email ID</FormControl.Label>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            type="text"
                          />
                        )}
                        name="email"
                        rules={{ required: true }}
                      />
                    </FormControl>
                    <FormControl w={'80'}>
                      <FormControl.Label>Password</FormControl.Label>
                      <Controller
                        defaultValue=""
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            type="password"
                          />
                        )}
                        name="password"
                        rules={{ required: true }}
                      />
                    </FormControl>
                    {error.status && (
                      <Box
                        bg={'red.200'}
                        p={1}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Text>{error.message}</Text>
                      </Box>
                    )}
                    <Center>
                      <Button
                        w={200}
                        onPress={handleSubmit(onSubmit)}
                        isLoading={isLoading}
                        isLoadingText="Logging in"
                        mt={5}
                        bg={'emerald.500'}
                      >
                        <Text color={'white'} fontSize={'xl'}>
                          Login
                        </Text>
                      </Button>
                    </Center>
                    <HStack justifyContent="center" height={screenHeight / 3}>
                      <Text
                        mr={1}
                        fontSize="lg"
                        color="coolGray.600"
                        _dark={{
                          color: 'warmGray.200',
                        }}
                      >
                        Don't have an account?
                      </Text>
                      <Link
                        _text={{
                          color: 'emerald.500',
                          fontWeight: 'medium',
                          fontSize: 'lg',
                        }}
                        onPress={() => navigation.navigate('Signup')}
                      >
                        Sign Up
                      </Link>
                    </HStack>
                  </VStack>
                </Center>
              </ScrollView>
            </Box>
          </Box>
        </Box>
      </Box>
    </ImageBackground>
  );
}
