import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  VStack,
  View,
  Icon,
} from 'native-base';
import { GetAllForumReplies, replyForum } from '../query/forum';
import { getTimeAgo } from '../utils/date';
import React from 'react';
import { AuthContext } from '../components/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { SOCKET } from '../utils/socket.config';
import { AntDesign } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
export default function ForumRepliesScreen({ route, navigation }: any) {
  const { params } = route;

  const { isLoading, data } = GetAllForumReplies(params.forum_id);
  const { isAuth } = React.useContext(AuthContext);

  const { handleSubmit, control, reset } = useForm();
  const [error, setError] = React.useState({
    status: false,
    message: '',
  });

  const { mutate, isLoading: submitting } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await replyForum(payload, params.forum_id);
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
    mutate(formData);
    reset();
  };

  const [messages, setMessages] = React.useState<any>([]);
  React.useEffect(() => {
    SOCKET.on(params.forum_id, (message: any) => {
      setMessages([message, ...messages]);
    });
  }, [messages, params.forum_id]);

  return (
    <ImageBackground
      source={require('../../assets/images/Background.jpg')}
      imageStyle={{ opacity: 0.1 }}
    >
      <ScrollView h={'100%'}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box>
            <VStack p={5} bg="white" m={3}>
              <VStack space={2}>
                <Text fontSize={'2xl'} bold>
                  {data.question}
                </Text>
                <HStack mb={4}>
                  <Text>By {data.asked_by.name}</Text>
                  <Spacer />
                  <Text>{getTimeAgo(data.created_at)}</Text>
                </HStack>
              </VStack>
              <Divider mb={3} />
              <Text fontSize={'md'} mb={5}>
                {data.description}
              </Text>
            </VStack>
            <Box p={2}>
              <Divider />
              <Divider />
            </Box>
            <Box mt={4} mb={20}>
              {data.replies.map((reply: any) => (
                <VStack
                  key={reply.id}
                  mt={1}
                  space={4}
                  rounded={'md'}
                  p={5}
                  bg={'white'}
                  m={2}
                >
                  <VStack space={2}>
                    <HStack>
                      <Text fontWeight={'semibold'}>
                        {reply.replied_by.name}
                      </Text>
                      <Spacer />
                      <Text color={'gray.500'} mr={5}>
                        {getTimeAgo(reply.created_at)}
                      </Text>
                    </HStack>
                    <Text fontSize={'md'}>{reply.comment}</Text>
                  </VStack>
                </VStack>
              ))}
            </Box>
          </Box>
        )}
      </ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
          }}
        >
          {isAuth ? (
            <HStack
              justifyContent={'space-between'}
              style={{ gap: 10 }}
              m={4}
              _dark={{
                borderColor: '#5d6065',
              }}
              borderColor="#5d6065"
              bg={'white'}
              shadow={5}
              p={1}
              borderRadius={5}
            >
              <Controller
                defaultValue={''}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    borderColor={'transparent'}
                    w={'65%'}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    type="text"
                    placeholder="Write a reply...."
                  />
                )}
                name="comment"
                rules={{ required: true }}
              />
              <Button
                w={'29%'}
                bg={'#5d6065'}
                isLoading={submitting}
                onPress={handleSubmit(onSubmit)}
              >
                Reply
              </Button>
            </HStack>
          ) : (
            <Button onPress={() => navigation.jumpTo('Account')} m={4}>
              Sign in to Reply
            </Button>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
