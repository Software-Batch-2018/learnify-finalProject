import {
  AspectRatio,
  Center,
  Text,
  Box,
  Image,
  Stack,
  Heading,
  HStack,
  ScrollView,
  Spinner,
  useDisclose,
  Pressable,
  Actionsheet,
  Alert,
  VStack,
} from 'native-base';
import React from 'react';
import { GetAllBlogs } from '../query/blog';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

function AlertBox() {
  return (
    <Center mt={5}>
      <Alert maxW="400" status="info" colorScheme="info">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack
            flexShrink={1}
            space={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack flexShrink={1} space={2} alignItems="center">
              <Alert.Icon />
              <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                There is no blogs currently.
              </Text>
            </HStack>
          </HStack>
          <Box
            pl="6"
            _text={{
              color: 'coolGray.600',
            }}
          >
            Please wait for more blogs or send your blogs at blogs@learnify.com.
          </Box>
        </VStack>
      </Alert>
    </Center>
  );
}

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const currentDate = new Date();

  const timeDiff = Math.abs(currentDate.getTime() - date.getTime());
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return seconds + ' second' + (seconds !== 1 ? 's' : '') + ' ago';
  } else if (minutes < 60) {
    return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
  } else if (hours < 24) {
    return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
  } else if (days < 30) {
    return days + ' day' + (days !== 1 ? 's' : '') + ' ago';
  } else if (months < 12) {
    return months + ' month' + (months !== 1 ? 's' : '') + ' ago';
  } else {
    return years + ' year' + (years !== 1 ? 's' : '') + ' ago';
  }
}

function truncateString(text: string) {
  const words = text.split(' ');
  const truncatedWords = words.slice(0, 20);
  const truncatedText = truncatedWords.join(' ');

  if (words.length > 20) {
    return truncatedText + '...';
  } else {
    return truncatedText;
  }
}

function removeHtmlTags(text: string) {
  return text.replace(/<.*?>/g, '');
}
export default function BlogScreen() {
  const { data, isLoading } = GetAllBlogs();
  const { isOpen, onOpen, onClose } = useDisclose();
  const { width } = useWindowDimensions();
  const [blog, setBlog] = React.useState({
    title: '',
    author: '',
    image:
      'https://images.unsplash.com/photo-1685432051879-31fa592be8a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    content: '',
  });

  return (
    <>
    <Center backgroundColor={'#5d6065'}>
        <Heading mt={7} pb={4} color={'white'} fontSize={'2xl'}>
        Blogs from
          <Text color="emerald.500"> Learnify</Text>
        </Heading>
      </Center>
      <ScrollView bg={'white'}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box>
            {data && data.items.length > 0 ? (
              data.items.map((blog: any) => (
                <Pressable
                  onPress={() => {
                    setBlog({
                      title: blog.title,
                      image: blog.blog_img,
                      content: blog.content,
                      author: blog.author.name,
                    });
                    onOpen();
                  }}
                  key={blog.blog_id}
                >
                  <BlogCard
                    image={blog.blog_img}
                    timeAgo={getTimeAgo(blog.updated_at)}
                    title={blog.title}
                    author={blog.author.name}
                    content={truncateString(removeHtmlTags(blog.content))}
                  />
                </Pressable>
              ))
            ) : (
              <AlertBox />
            )}
          </Box>
        )}
      </ScrollView>
      <Actionsheet h={'100%'} isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView>
            <Box w="92%" h={'full'} px={4}>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri: blog.image,
                  }}
                  alt="image"
                />
              </AspectRatio>
              <Stack mt={4} space={3} overflowX={'-moz-hidden-unscrollable'}>
                <Stack overflowX={'-moz-hidden-unscrollable'} space={2}>
                  <Heading size="md" ml="-1">
                    {blog.title}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: 'violet.500',
                    }}
                    _dark={{
                      color: 'violet.400',
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    {blog.author}
                  </Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: blog.content }}
                  />
                </Stack>
              </Stack>
            </Box>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

interface BlogCardProps {
  title: string;
  author: string;
  timeAgo: string;
  content: string;
  image: string;
}

const BlogCard = ({
  title,
  author,
  timeAgo,
  content,
  image,
}: BlogCardProps) => {
  return (
    <Box alignItems="center">
      <Box
        m={2}
        mt={2}
        mb={0}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: image,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {title}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: 'violet.500',
              }}
              _dark={{
                color: 'violet.400',
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {author}
            </Text>
          </Stack>
          <Text fontWeight="400">{content}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400"
              >
                {timeAgo}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
