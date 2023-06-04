import {
  Box,
  Divider,
  HStack,
  Heading,
  Spacer,
  Spinner,
  Text,
  VStack,
  Pressable,
} from 'native-base';
import { GetAllForumQuestion } from '../query/forum';
import { getTimeAgo } from '../utils/date';

export default function ForumScreen({ navigation }: any) {
  const { isLoading, data } = GetAllForumQuestion();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          {data.items.map((q: any) => (
            <Pressable
              onPress={() =>
                navigation.navigate('ForumReply', {
                  forum_id: q.id,
                })
              }
              m={4}
            >
              <VStack space={4} bg={'blue.100'} rounded={'md'} p={5}>
                <VStack space={2}>
                  <Heading>{q.question}</Heading>
                  <HStack>
                    <Text>By {q.asked_by.name}</Text>
                    <Spacer />
                    <Text>{getTimeAgo(q.created_at)}</Text>
                  </HStack>
                </VStack>
                <Divider />
                <Text>{q.description}</Text>

                <Text color={'gray.400'}>Read More</Text>
              </VStack>
            </Pressable>
          ))}
        </Box>
      )}
    </Box>
  );
}
