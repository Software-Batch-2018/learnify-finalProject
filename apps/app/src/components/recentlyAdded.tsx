import {
  Box,
  AspectRatio,
  Image,
  Text,
  Heading,
  HStack,
  Center,
  Skeleton,
  VStack,
  CheckIcon
} from 'native-base';
import { GetAllPopularCourses } from '../query/home';
import { Pressable } from 'react-native';

const Cards = ({
  title_image,
  content_id,
  content_title,
  navigation,
}: {
  title_image: string;
  content_title: string;
  content_id: string;
  navigation: any;
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
      <Box mb={1} p={0} w={'100%'} style={{ flexDirection: 'row', flexWrap: 'wrap' }}
        borderBottomWidth="1"
        _dark={{
          borderColor: 'gray.100',
        }}
        borderColor="gray.100"
        pl='1'
        pr='1'
        py="2"
        bg={'white'}
        borderRadius={15}
        shadow={1}>
        <AspectRatio rounded={'md'} w={55} h={55} ml={1} ratio={1 / 1}>
          <Image
            source={{
              uri: title_image,
            }}
            alt="image"
            borderRadius={10}
          />
        </AspectRatio>
        <Box ml={5} >
          <Text fontSize={'lg'} bold italic color={'#5d6065'}>
            {content_title}
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
          >
            <Text color="emerald.500" fontSize="sm" ml={5}>
              Learnify Verfied <CheckIcon size="3" mt="1" color="emerald.500" />
            </Text>
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

const SkeletonComponent = () => {
  return (
    <Center w="100%">
      <HStack
        w="90%"
        borderWidth="1"
        space={0}
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

export function RecentlyAdded({ navigation, heading = true }: any) {
  const { isLoading, data } = GetAllPopularCourses();
  return (
    <Box mb={2} mx={2} mt={2}>
      {heading && <Heading mb={2} >Recently Added to <Text color={'emerald.600'}>Learnify</Text></Heading>}
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <VStack>
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
        </VStack>
      )}
    </Box>
  );
}
