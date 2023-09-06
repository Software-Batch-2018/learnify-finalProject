import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Avatar,
  Box,
  Center,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { FlatList, ImageBackground, Pressable, View } from 'react-native';

type aboutScreenProp = StackNavigationProp<any, 'About'>;

const Example = () => {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Kusal Lamsal',
      timeStamp: '12:47 PM',
      recentText: 'Full Stack Involvement!',
      avatarUrl:
        'https://media.licdn.com/dms/image/C4D03AQHNMlbo9huWEA/profile-displayphoto-shrink_800_800/0/1655845254138?e=2147483647&v=beta&t=wo_UkjVTTRj8XQGkkUAR4hRdlZNdpEVuw_h7P6QKrHg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Milan Pokhrel',
      timeStamp: '11:11 PM',
      recentText: 'Full Stack Involvement!',
      avatarUrl:
        'https://media.licdn.com/dms/image/D4E03AQFWKcvdUWLVog/profile-displayphoto-shrink_800_800/0/1684985204653?e=2147483647&v=beta&t=NDyUz7vnM2uEDCDy3a69q2O_NDKE7AVgaovnrokG158',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Dipesh Subedi',
      timeStamp: '6:22 PM',
      recentText: 'Content Research and deployment!',
      avatarUrl: 'https://i.ibb.co/DV8Xk07/IMG-20230528-191622.jpg',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Prasiddha Bhusal',
      timeStamp: '8:56 PM',
      recentText: 'Security',
      avatarUrl:
        'https://media.licdn.com/dms/image/C5603AQFbrQ6Aejut1A/profile-displayphoto-shrink_800_800/0/1647224794275?e=2147483647&v=beta&t=6K3ahTGvUOposmN-0zbjSZwalAj0MKOY8K1PXYXa3u0',
    },
    {
      id: '28694a0f-3da1-471f-bd96-142456e29d72',
      fullName: 'Chirag Gharti',
      timeStamp: '12:47 PM',
      recentText: 'Mobile app and content research',
      avatarUrl: 'https://i.ibb.co/kMWpDWs/IMG-20230906-175954.jpg',
    },
  ];
  return (
    <Box m={4}>
      <Heading fontSize="xl" p="4" pb="3">
        Contributors
      </Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'muted.50',
            }}
            borderColor="muted.800"
            pl={['0', '4']}
            pr={['0', '5']}
            py="2"
          >
            <HStack space={[2, 3]} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item.avatarUrl,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.fullName}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                >
                  {item.recentText}
                </Text>
              </VStack>
              <Spacer />
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};
export default function AboutScreen() {
  const navigation = useNavigation<aboutScreenProp>();
  return (
    <View>
      <ImageBackground
        source={require('../../assets/images/Background.jpg')}
        imageStyle={{ opacity: 0.1 }}
        style={{ height: '100%' }}
      >
        <Box mt={5}>
          <Center>
            <Heading color={'green.500'}>Learnify</Heading>
          </Center>

          <Example />
        </Box>
      </ImageBackground>
    </View>
  );
}
