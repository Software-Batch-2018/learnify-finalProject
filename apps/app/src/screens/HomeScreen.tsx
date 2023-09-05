import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  Input,
  ScrollView,
  StatusBar,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import { PopularCourses } from '../components/popularCourse';
import { RecentlyAdded } from '../components/recentlyAdded';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
export function HomeScreen({ navigation }: any) {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require('../../assets/images/Background.jpg')} imageStyle={{ opacity: 0.1 }} style={{ borderColor: "black", borderBottomWidth: 2 }} >
          <View px={4} flexDirection={'row'} justifyContent={'space-between'} justifyItems={'center'} alignItems={'center'}>
            <Text fontSize={'3xl'} bold color={'emerald.500'}>Learnify</Text>
            <TouchableOpacity>
              <Icon
                color={'black'}
                size={9}
                as={<Feather name="bookmark" />}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ScrollView bg={'#ffffff'} w={'100%'}>
          <View mx={5} mt={1}>
            <View flexDirection={'row'} justifyItems={'center'} alignItems={'center'} px={3} py={1} bg={'#f5f5f5'} rounded={'full'} borderColor={'black'} borderBottomWidth={1}>
              <TextInput placeholderTextColor={'gray'} placeholder={'Search'} style={{ flex: 1, paddingHorizontal: 20, fontWeight: '600' }} />
              <TouchableOpacity style={{ padding: 5, backgroundColor: 'gray', borderRadius: 50 }}>
                <Icon
                  color={'white'}
                  size={7}
                  as={<Feather name="search" />}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ViewSection navigation={navigation}/>
          <PopularCourses navigation={navigation} />
          <RecentlyAdded navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const ViewSection = ({ navigation }: any) => {
  return (
    <View p={6} pb={1}>
      <Heading>
        Join our{' '}
        <Heading color="emerald.400">Learnify Discussion Forum</Heading>
      </Heading>
      <Text pt="3">
        The Learnify Discussion Forum is a vibrant community where students come
        together to help and support each other in their learning journey.
        Engage in meaningful discussions, ask questions, and share knowledge
        with fellow learners.
      </Text>
      <Button
        onPress={() => navigation.jumpTo('Forum')}
        mt={3}
        bg={'green.600'}
      >
        Join Now
      </Button>
    </View>
  );
};

const FabSection = () => {
  return (
    <Center>
      <Box
        p={5}
        height="205"
        w={340}
        mt={2}
        shadow="1"
        rounded="lg"
        _dark={{
          bg: 'coolGray.100:alpha.20',
        }}
        _light={{
          bg: 'coolGray.100:alpha.20',
        }}
      >
        <Heading color={'blue.500'} fontSize={'3xl'}>
          Learnify
        </Heading>
        <Text mt={1}>
          Learnify is a comprehensive educational app that empowers students to
          learn, collaborate, and assess their knowledge. With interactive
          quizzes, discussion forums, and a vast library of resources, it
          facilitates a dynamic and engaging learning experience.
        </Text>
      </Box>
    </Center>
  );
};
