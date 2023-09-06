import {
  Box,
  Button,
  Center,
  Heading,
  Icon,
  ScrollView,
  Text,
  View,
} from 'native-base';
import React from 'react';
import { PopularCourses } from '../components/popularCourse';
import { Feather } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, ImageBackground } from 'react-native';

export function HomeScreen({ navigation }: any) {
  const [text, onChangeText] = React.useState('');
  return (
    <ImageBackground
      source={require('../../assets/images/Background.jpg')}
      imageStyle={{ opacity: 0.1 }}
    >
      <View
        px={4}
        mt={2}
        flexDirection={'row'}
        justifyContent={'space-between'}
        justifyItems={'center'}
        alignItems={'center'}
      >
        <Text fontSize={'3xl'} bold color={'emerald.500'}>
          Learnify
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Icon color={'black'} size={7} as={<Feather name="info" />} />
        </TouchableOpacity>
      </View>
      <ScrollView w={'100%'}>
        <View mx={5} mt={1}>
          <View
            flexDirection={'row'}
            justifyItems={'center'}
            alignItems={'center'}
            px={3}
            py={1}
            bg={'#f5f5f5'}
            rounded={'full'}
            borderColor={'black'}
            shadow={9}
          >
            <TextInput
              value={text}
              onChangeText={onChangeText}
              placeholderTextColor={'gray'}
              placeholder={'Search'}
              style={{ flex: 1, paddingHorizontal: 20, fontWeight: '600' }}
            />
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: 'gray',
                borderRadius: 50,
              }}
              onPress={() => {
                if (text !== '') {
                  navigation.navigate('Search', {
                    query: text,
                  });
                }
              }}
            >
              <Icon color={'white'} size={7} as={<Feather name="search" />} />
            </TouchableOpacity>
          </View>
        </View>
        <ViewSection navigation={navigation} />
        <Box mt={7}>
          <Center>
            <PopularCourses navigation={navigation} />
          </Center>
        </Box>
      </ScrollView>
    </ImageBackground>
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
