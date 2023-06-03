import {
  Box,
  AspectRatio,
  Image,
  Text,
  Heading,
  ScrollView,
  HStack,
  Center,
  Skeleton,
  VStack,
} from 'native-base';
import { GetAllPopularCourses } from '../query/home';
import { Pressable } from 'react-native';

const Cards = ({
  title_image,
  content_id,
  content_title,
  navigation
}: {
  title_image: string;
  content_title: string;
  content_id: string;
  navigation:any
}) => {
  return (
    <Pressable
    onPress={() =>
      navigation.navigate('MainContent', {
        title: content_title,
        image: title_image,
        course_id: content_id,
      })
    }
    
    >
      <Box mr={2} p={1} bg={'blue.100'} h={32} w={'32'}>
        <AspectRatio rounded={'md'} w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: title_image,
            }}
            alt="image"
          />
        </AspectRatio>
        <Text p={1} fontSize={'md'} fontWeight={'bold'}>
          {content_title}
        </Text>
        <Text px={1} fontSize={'sm'}>
          Learnify verified
        </Text>
      </Box>
    </Pressable>
  );
};

const SkeletonComponent = () => {
  return (
    <Center w="100%">
      <HStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={8}
        rounded="md"
        _dark={{
          borderColor: 'coolGray.500',
        }}
        _light={{
          borderColor: 'coolGray.200',
        }}
        p="4"
      >
        <VStack flex="3" space="4">
          <Skeleton.Text />
          <HStack space="2" alignItems="center">
            <Skeleton h="3" flex="2" rounded="full" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          </HStack>
        </VStack>
      </HStack>
    </Center>
  );
};

export  function PopularCourses({navigation}:any) {
  const { isLoading, data } = GetAllPopularCourses();
  return (
    <Box mb={2} mx={6}>
      <Heading mb={2}>Popular courses</Heading>
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <ScrollView horizontal={true}>
          <HStack>
            {data.map(
              (course: {
                content_id: string;
                content_title: string;
                title_image: string;
              }) => (
                <Cards
                  navigation={navigation}
                  key={course.content_id}
                  content_id={course.content_id}
                  content_title={course.content_title}
                  title_image={course.title_image}
                />
              )
            )}
          </HStack>
        </ScrollView>
      )}
    </Box>
  );
}
