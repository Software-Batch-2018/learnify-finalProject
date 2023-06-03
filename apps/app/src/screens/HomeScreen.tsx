import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  ScrollView,
  Text,
  View,
  Image,
  HStack,
} from 'native-base';
import React from 'react';

export function HomeScreen() {
  return (
    <ScrollView w={'100%'}>
      <FabSection />
      <ViewSection />
      <Box mb={2} mx={6}>
        <Heading mb={2}>Popular courses</Heading>
        <ScrollView horizontal={true}>
        <HStack>
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </HStack>
        </ScrollView>
      </Box>
    </ScrollView>
  );
}

const Cards = () => {
  return (
    <Box mr={2} p={1} bg={'blue.100'} h={32} w={'32'}>
      <AspectRatio w="100%" ratio={16 / 9}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dpessyoae/image/upload/v1494083335/linkedlist3_fsadk8.png"
          }}
          alt="image"
        />
      </AspectRatio>
      <Text p={1}  fontSize={'md'} fontWeight={'bold'}>
        Linked List
      </Text>
      <Text px={1}  fontSize={'sm'} >
        Learnify verified
      </Text>
    </Box>
  );
};

const ViewSection = () => {
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
      <Button mt={3} bg={'green.600'}>
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
