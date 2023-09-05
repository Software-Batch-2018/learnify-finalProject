import React from 'react';
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Spinner,
  CheckIcon,
  Pressable,
  Divider,
  View,
} from 'native-base';
import { GetAllSubjects } from '../query/subjects';
import { InfoBox } from '../components/info';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  Dimensions, ImageBackground } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const Example = ({ data, navigation }: { data: any[]; navigation: any }) => {
  return (
    <Box bg={'#91919163'} height={screenHeight-120}>
      <FlatList
      style={{
        alignSelf: 'center',
      }}
      width={'96%'}
        data={data}
        renderItem={({ item }) => (
          <Pressable
            key={item.subject_id}
            onPress={() =>
              navigation.navigate('Contents', { subject_id: item.subject_id , subject_name: item.subject_name, subject_img: item.subject_img , count: item.contentsCount })
            }
          >
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.100',
              }}
              borderColor="gray.100"
              p={5}
              bg={'white'}
              mb={1}
              mt={1}
              borderRadius={15}
              shadow={1}
            >
              <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar
                  size="48px"
                  source={{
                    uri: item.subject_img,
                  }}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: '#5d6065',
                    }}
                    color="#5d6065"
                    bold
                  >
                    {item.subject_name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    <HStack mt={2} space={1}>
                      <Text color="emerald.500" fontSize="sm">
                        Learnify Verfied
                      </Text>
                      <CheckIcon size="3" mt="1" color="emerald.500" />
                    </HStack>
                  </Text>
                </VStack>
                <Spacer />
                <Text mr={'3'} mt={3} color={'#8d9096'}>{item.contentsCount}</Text>
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.subject_id}
      />
    </Box>
  );
};

export const SubjectScreen = ({ route, navigation }: any) => {
  const { params } = route;
  const { isLoading, data } = GetAllSubjects(params.level_id);
  return (
    <SafeAreaView>
      <ImageBackground source={require('../../assets/images/Background.jpg')} imageStyle={{ opacity: 0.1 }} style={{ borderColor: "black", borderBottomWidth: 2 }} >
          <View px={4} py={3} flexDirection={'row'} justifyContent={'space-between'} justifyItems={'center'} alignItems={'center'}>
            <Text fontSize={'2xl'} bold color={'emerald.500'}>{params.level_name}</Text>
          </View>
        </ImageBackground>
      <Box p={0} bg={'white'} h={'full'}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box>
            {data && data.length > 0 ? (
              <Example navigation={navigation} data={data} />
            ) : (
              <InfoBox
                title="No Subjects!"
                description="There is no subject for this level currently. We will be adding soon!"
              />
            )}
          </Box>
        )}
      </Box>
    </SafeAreaView>
  );
};
