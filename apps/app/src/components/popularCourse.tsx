import {
  Box,
  AspectRatio,
  Text,
  Heading,
  ScrollView,
  HStack,
  Center,
  Skeleton,
  VStack,
  View,
  Avatar,
} from 'native-base';
import { GetAllPopularCourses } from '../query/home';
import { ImageBackground, Pressable, StyleSheet, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 30,
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
  return (<>
    <Text my={1} mx={5} fontSize={'2xl'} fontWeight={'bold'}>Recommended For You</Text>
    <Box mt={2} mb={2}>
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <Carousel style={{ overflow: 'visible' }} data={data} renderItem={({ item }: any) => <RecommendedCourses navigation={navigation} item={item} />}
          firstItem={1}
          inactiveSlideOpacity={0.75}
          inactiveSlideScale={0.77}
          sliderWidth={400}
          itemWidth={260}
          slideStyle={{ display: 'flex', alignItems: 'center' }}
        />
      )}
    </Box>
  </>
  );
}

export function RecommendedCourses({ item, navigation }: any) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('MainContent', {
          title: item.content_title,
          image: item.title_image,
          course_id: item.content_id,
        })
      }
    >
      <View borderRadius={40} backgroundColor={'warmGray.100'} h={200} w={290}>
        <ImageBackground borderRadius={40}
          source={{ uri: item.title_image }}
          resizeMode="cover"
          blurRadius={10}
          style={styles.image}
        >
          <View borderRadius={40} style={styles.backdrop} />
          <Center>
            <Text style={styles.text}>{item.content_title}</Text>
          </Center>
        </ImageBackground>
      </View>
    </Pressable>
  )
}
