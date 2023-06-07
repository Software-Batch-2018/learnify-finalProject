import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  Input,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import { PopularCourses } from '../components/popularCourse';
import { MaterialIcons } from '@expo/vector-icons';
export function HomeScreen({ navigation }: any) {
  return (
    <ScrollView bg={'#03001C'} w={'100%'}>
      <VStack space={7} p={3} mt={20}>
        <Input
          bg={'white'}
          height={10}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="search" />}
              size={5}
              ml="2"
              color="black"
            />
          }
          color={'black'}
          placeholder="Search Courses"
        />
        <PopularCourses navigation={navigation} />
        <Heading fontSize={'3xl'} color={'white'}>
          Top Subjects
        </Heading>
      </VStack>
    </ScrollView>
  );
}

const ViewSection = ({ navigation }: any) => {
  return (
    <View p={6}>
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
