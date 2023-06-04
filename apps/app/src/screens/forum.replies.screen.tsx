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
} from 'native-base';
import { GetAllForumReplies, replyForum } from '../query/forum';
import { getTimeAgo } from '../utils/date';
import React from 'react';
import { AuthContext } from '../components/AuthProvider';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
export default function ForumRepliesScreen({ route, navigation }: any) {
  const { params } = route;

  const { isLoading, data, refetch } = GetAllForumReplies(params.forum_id);
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
        refetch();
      }
      return data;
    },
  });
  const onSubmit = (formData: any) => {
    console.log(formData);
    mutate(formData);
    reset();
  };
  return (
    <ScrollView>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          <VStack m={4} space={4} bg={'blue.100'} rounded={'md'} p={5}>
            <VStack space={2}>
              <Heading>{data.question}</Heading>
              <HStack>
                <Text>By {data.asked_by.name}</Text>
                <Spacer />
                <Text>{getTimeAgo(data.created_at)}</Text>
              </HStack>
            </VStack>
            <Divider />
            <Text>{data.description}</Text>
          </VStack>
          {isAuth ? (
            <Box
              display={'flex'}
              flexDir={'row'}
              width={'100%'}
              style={{ gap: 5 }}
              m={4}
            >
              <Controller
                defaultValue={''}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    w={'75%'}
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
              <Button isLoading={submitting} onPress={handleSubmit(onSubmit)}>
                Reply
              </Button>
            </Box>
          ) : (
            <Button onPress={() => navigation.jumpTo('Account')} m={4}>
              Sign in to Reply
            </Button>
          )}

          {data.replies.map((reply: any) => (
            <VStack
              key={reply.id}
              m={4}
              space={4}
              bg={'green.100'}
              rounded={'md'}
              p={5}
            >
              <VStack space={2}>
                <Text fontSize={'md'}>{reply.comment}</Text>
                <HStack>
                  <Text fontWeight={'semibold'}>
                    By {reply.replied_by.name}
                  </Text>
                  <Spacer />
                  <Text color={'blue.700'}>{getTimeAgo(reply.created_at)}</Text>
                </HStack>
              </VStack>
            </VStack>
          ))}
        </Box>
      )}
    </ScrollView>
  );
}
