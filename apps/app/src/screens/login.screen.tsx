import { NavigationProp } from '@react-navigation/native';
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
import { RootStackParamList } from '../types';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { loginUser } from '../query/auth';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

type FormValues = {
  email: string;
  password: string;
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

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      // saving error
    }
  };

  const getData = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Profile' }],
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [navigation]);

  const onSubmit = (formData: any) => {
    formData.email = formData.email.toLowerCase();
    mutate(formData);
  };

  React.useEffect(() => {
    getData();
    if (data && data.token) {
      storeData(data.token).then(() => {
        navigation.navigate('Profile');
      });
    }
  }, [data, getData, navigation]);

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome to{' '}
          <Text color={'blue.400'} fontWeight={'bold'}>
            Learnify
          </Text>
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
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
          <FormControl>
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
          <Button
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            isLoadingText="Submitting"
          >
            Submit
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              I'm a new user.
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.navigate('Signup')}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
