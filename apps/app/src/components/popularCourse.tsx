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
  subject_name,
  navigation,
}: {
  title_image: string;
  content_title: string;
  content_id: string;
  subject_name: string;
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
      <Box rounded="2xl" overflow="hidden" h={'48'} w={'72'}>
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: title_image }}
            resizeMode="cover"
            blurRadius={10}
            style={styles.image}
          >
            <View style={styles.backdrop} />
            <Text style={styles.text}>{content_title}</Text>
            <Text style={styles.subText}>{subject_name}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    color: 'white',
    fontSize: 30,
    lineHeight: 84,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subText: {
    color: 'white',
    marginLeft: 20,
    fontSize: 16,
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
    <Box>
      {heading && (
        <Heading fontSize={'2xl'} textAlign={'center'} mb={5}>
          Recommended Courses
        </Heading>
      )}
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <ScrollView horizontal={true}>
          <HStack space={5} mx={4}>
            {data.map(
              (course: {
                content_id: string;
                content_title: string;
                title_image: string;
                subjects: {
                  subject_name: string;
                };
              }) => (
                <Cards
                  navigation={navigation}
                  key={course.content_id}
                  content_id={course.content_id}
                  content_title={course.content_title}
                  title_image={course.title_image}
                  subject_name={course.subjects.subject_name}
                />
              )
            )}
          </HStack>
        </ScrollView>
      )}
    </Box>
  );
}
