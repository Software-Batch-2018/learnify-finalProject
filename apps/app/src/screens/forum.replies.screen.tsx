import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  Spacer,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import { GetAllForumReplies } from '../query/forum';
import { getTimeAgo } from '../utils/date';
import React, { useState } from 'react';
import { hasToken } from '../utils/auth.check';
export default function ForumRepliesScreen({ route, navigation }: any) {
  const { params } = route;

  const { isLoading, data } = GetAllForumReplies(params.forum_id);
  const [isAuth, setIsAuth] = useState(false);
  React.useEffect(() => {
    hasToken().then((value) => setIsAuth(value));
  }, []);
  return (
    <Box>
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
          {data.replies.map((reply: any) => (
            <VStack m={4} space={4} bg={'blue.100'} rounded={'md'} p={5}>
              <VStack space={2}>
                <Text fontSize={'md'}>{reply.comment}</Text>
                <HStack>
                  <Text fontWeight={'semibold'}>
                    By {reply.replied_by.name}
                  </Text>
                  <Spacer />
                  <Text color={'green.700'}>
                    {getTimeAgo(reply.created_at)}
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          ))}
          {isAuth ? (
            <HStack width={'100%'} space={2} m={4}>
              <Input placeholder="Write a reply....." />
              <Button>Reply</Button>
            </HStack>
          ) : (
            <Button onPress={() => navigation.jumpTo('Account')} m={4}>
              Sign in to Reply
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
