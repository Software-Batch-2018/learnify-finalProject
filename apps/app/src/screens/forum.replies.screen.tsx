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
import { GetAllForumReplies } from '../query/forum';
import { getTimeAgo } from '../utils/date';
import React from 'react';
import { AuthContext } from '../components/AuthProvider';
export default function ForumRepliesScreen({ route, navigation }: any) {
  const { params } = route;

  const { isLoading, data } = GetAllForumReplies(params.forum_id);
  const { isAuth } = React.useContext(AuthContext);
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
              <Input width={'75%'} placeholder="Write a reply....." />
              <Button>Reply</Button>
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
