import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Text,
  VStack,
  Avatar,
} from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { registerUser } from '../query/user';
import { useMutation } from 'react-query';
import { validatePassword } from '../utils/check';
import { Select } from 'native-base';
import { GetAllLevels } from '../query/levels';
import { useWindowDimensions } from 'react-native';
export const SignupScreen = ({ navigation }: any) => {
  const { isLoading: levelLoading, data: levels } = GetAllLevels();

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
        message: 'Password donot match!',
      });
      return;
    }

    if (!validatePassword(formData.password)) {
      setError({
        status: true,
        message:
          'Passwords must be 8 characters long, must contain atleast one symbol, capital letter and number!',
      });
      return;
    }
    setError({ status: false, message: '' });
    delete formData.confirm_password;
    mutate(formData);
  };

  React.useEffect(() => {
    if (data && data.email) {
      navigation.replace('Login');
    }
  }, [data, navigation]);

  const { height } = useWindowDimensions();

  return (
    <ScrollView>
      <Center w="100%">
        <Box safeArea w="90%" maxW="290">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold"
          >
            Welcome to <Text color={'blue.400'}>Learnify</Text>
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
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
            <FormControl>
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
                rules={{ required: false }}
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
            <FormControl>
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
            <FormControl>
              <FormControl.Label>Select Level</FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    selectedValue={value}
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder="Choose Service"
                    _selectedItem={{
                      bg: 'teal.600',
                    }}
                    mt={1}
                    onValueChange={(value) => onChange(value)}
                  >
                    {levels &&
                      levels.map(
                        (
                          level: {
                            level: string;
                            level_id: string;
                            level_img: string;
                          },
                          index: string
                        ) => (
                          <Select.Item
                            key={index}
                            label={level.level}
                            value={level.level_id}
                            leftIcon={
                              <Avatar
                                width={8}
                                height={8}
                                source={{
                                  uri: level.level_img,
                                }}
                              />
                            }
                          />
                        )
                      )}
                  </Select>
                )}
                name="user_level"
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
            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              isLoadingText="Submitting"
            >
              Submit
            </Button>
          </VStack>
        </Box>
      </Center>
    </ScrollView>
  );
};
