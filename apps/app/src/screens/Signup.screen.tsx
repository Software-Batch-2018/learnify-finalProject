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
  ScrollView
} from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { registerUser } from '../query/user';
import { useMutation } from 'react-query';
import { validatePassword } from '../utils/check';
import { ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const image = { uri: 'https://i.ibb.co/zJF1mBy/Pngtree-an-old-bookcase-in-a-2760144.jpg' };
export const SignupScreen = ({ navigation }: any) => {
  const { handleSubmit, control } = useForm();
  const [error, setError] = React.useState({
    status: false,
    message: '',
  });

  const { mutate, data, isLoading } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await registerUser(payload);
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
    if (formData.confirm_password !== formData.password) {
      setError({
        status: true,
        message: "Password donot match!"
      })
      return
    }

    if (!validatePassword(formData.password)) {
      setError({
        status: true,
        message: "Passwords must be 8 characters long, must contain atleast one symbol, capital letter and number!"
      })
      return
    }
    setError({ status: false, message: "" })
    delete formData.confirm_password
    mutate(formData)
  };

  React.useEffect(() => {
    if (data && data.email) {
      navigation.replace('Login')
    }
  }, [data, navigation])


  return (
    <ImageBackground source={image}>
      <Box height={screenHeight-60}>
        <Center h={'20%'} >
          <Heading fontSize={'5xl'} color={'white'}>
            Signup
          </Heading>
        </Center>
        <Box bg={'white'} borderTopLeftRadius={'150'}>
          <Box w="100%" h={'100%'}>
            <Box safeArea p="2" w="100%">
              <Center>
                <Heading pb={4} color={'black'} fontSize={'2xl'}>
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
                  Sign up to continue!
                </Heading>
              </Center>
              <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <Center>
                  <VStack space={1} mt="1">
                    <FormControl w={'80'}>
                      <FormControl.Label>Full Name</FormControl.Label>
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
                        name="name"
                        rules={{ required: true }}
                      />
                    </FormControl>
                    <FormControl w={'80'}>
                      <FormControl.Label>Email</FormControl.Label>
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
                    <FormControl w={'80'}>
                      <FormControl.Label>Confirm Password</FormControl.Label>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            type="password"
                          />
                        )}
                        name="confirm_password"
                        rules={{ required: true }}
                      />
                    </FormControl>
                    {error.status && (
                      <Box
                        bg={'red.200'}
                        p={1}
                        rounded={'md'}
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Text color={'gray.600'}>{error.message}</Text>
                      </Box>
                    )}
                    <Center>
                      <Button
                        w={200}
                        onPress={handleSubmit(onSubmit)}
                        isLoading={isLoading}
                        isLoadingText="Submitting"
                        mt={1}
                        bg={'emerald.500'}
                      >
                        <Text color={'white'} fontSize={'xl'}>Submit</Text>
                      </Button>
                    </Center>
                    <HStack justifyContent="center" height={screenHeight/1.5}>
                      <Text
                        mr={1}
                        fontSize="sm"
                        color="coolGray.600"
                        _dark={{
                          color: 'warmGray.200',
                        }}
                      >
                        Already have an account?
                      </Text>
                      <Link
                        _text={{
                          color: 'emerald.500',
                          fontWeight: 'medium',
                          fontSize: 'sm',
                        }}
                        onPress={() => navigation.navigate('Login')}
                      >
                        Login
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
};
