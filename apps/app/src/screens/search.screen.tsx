import { Box, Center, Heading, ScrollView, Spinner, Text } from 'native-base';
import { ImageBackground, View, StyleSheet, Pressable } from 'react-native';
import { SearchAllCourses } from '../query/home';

export default function SearchScreen({ route, navigation }: any) {
  const { params } = route;
  console.log(params);
  const { data, isLoading } = SearchAllCourses(params.query);

  return (
    <ImageBackground
      source={require('../../assets/images/Background.jpg')}
      imageStyle={{ opacity: 0.1 }}
      style={{ height: '100%' }}
    >
      <ScrollView>
        <Center>
          <Heading
            textAlign={'center'}
            mt={7}
            pb={4}
            color={'black'}
            fontSize={'2xl'}
          >
            Search result for
            <Text color="emerald.500"> Learnify </Text>
            <Text>Courses</Text>
          </Heading>
        </Center>
        {isLoading ? (
          <Spinner />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {data.length > 0 ? (
              <Center>
                {data.map(
                  (course: {
                    content_id: string;
                    content_title: string;
                    title_image: string;
                    subjects: {
                      subject_name: string;
                    };
                  }) => (
                    <Pressable
                      style={{ margin: 5 }}
                      key={course.content_id}
                      onPress={() =>
                        navigation.navigate('MainContent', {
                          title: course.content_title,
                          image: course.title_image,
                          course_id: course.content_id,
                        })
                      }
                    >
                      <Box rounded="2xl" overflow="hidden" h={'40'} w={'80'}>
                        <View style={styles.container}>
                          <ImageBackground
                            source={{ uri: course.title_image }}
                            resizeMode="cover"
                            style={styles.image}
                          >
                            <View style={styles.backdrop} />
                            <Text style={styles.text}>
                              {course.content_title}
                            </Text>
                            <Text style={styles.subText}>
                              {course.subjects.subject_name}
                            </Text>
                          </ImageBackground>
                        </View>
                      </Box>
                    </Pressable>
                  )
                )}
              </Center>
            ) : (
              <Center mt={7}>
                <Heading>No Result Found</Heading>
              </Center>
            )}
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

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
    fontSize: 20,
    lineHeight: 64,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subText: {
    color: 'white',
    marginLeft: 20,
    fontSize: 16,
  },
});
