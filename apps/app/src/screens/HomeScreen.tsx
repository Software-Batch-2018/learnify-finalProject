import {
  Box,
  Button,
  Divider,
  Heading,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import React from 'react';
import { PopularCourses } from '../components/popularCourse';
import { RecentlyAdded } from '../components/recentlyAdded';
import {  Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const screenHeight = Dimensions.get('window').height;
export function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView>
    <Box p={1} bg={'white'} h={screenHeight - 60} >
      <ScrollView w={'100%'} backgroundColor={'white'} >
        <Text fontSize={'3xl'} bold bg={'white'}> Welcome to <Text color={'emerald.600'}>Learnify</Text></Text>
        <ViewSection navigation={navigation} />
        <Divider/>
        <Divider/>
        <PopularCourses navigation={navigation} />
        <Divider/>
        <Divider/>
        <RecentlyAdded navigation={navigation} />
      </ScrollView>
    </Box>
    </SafeAreaView>
  );
}

const image = { uri: "https://i.ibb.co/PQ4JD9c/top-image.png" };

const ViewSection = ({ navigation }: any) => {
  return (
    <View paddingTop={5} paddingLeft={2} paddingRight={2}>
      <Heading color={'emerald.600'}>
        Join our{' '}
        <Heading color="#5d6065">Learnify Discussion Forum</Heading>
      </Heading>
      <Text pt="1" color={'#5d6065'}>
        The Learnify Discussion Forum is a vibrant community where students come
        together to help and support each other in their learning journey.
        Engage in meaningful discussions, ask questions, and share knowledge
        with fellow learners.
      </Text>
      <Button
        onPress={() => navigation.jumpTo('Forum')}
        mt={3}
        mb={2}
        bg={'#5d6065'}
      >
        Join Now
      </Button>
    </View>
  );
};

