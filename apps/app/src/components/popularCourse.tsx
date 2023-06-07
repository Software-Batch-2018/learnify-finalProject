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
import { ImageBackground, Pressable, View, StyleSheet } from 'react-native';

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
      <Box rounded="2xl" overflow="hidden" h={'56'} w={'80'}>
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: title_image }}
            resizeMode="cover"
            blurRadius={10}
            style={styles.image}
          >
            <View style={styles.backdrop} />
            <Text style={styles.text}>{content_title}</Text>
            <Text style={styles.subText}>Data Structure and Algorithm</Text>
          </ImageBackground>
        </View>
      </Box>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    color: 'white',
    fontSize: 39,
    lineHeight: 84,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subText: {
    color: 'white',
    marginLeft: 20,
    fontSize: 20,
  },
});

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

export function PopularCourses({ navigation, heading = true }: any) {
  const { isLoading, data } = GetAllPopularCourses();
  return (
    <Box mb={2}>
      {heading && (
        <Heading fontSize={'3xl'} mb={5} color={'white'}>
          Popular Courses
        </Heading>
      )}
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <ScrollView horizontal={true}>
          <HStack space={5}>
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
