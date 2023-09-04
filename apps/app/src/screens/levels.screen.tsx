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
  Divider
} from 'native-base';
import { GetAllLevels } from '../query/levels';
import { Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;

const Example = ({ data, navigation }: { data: any[]; navigation: any }) => {
  return (
    <Box bg={'#91919163'} height={screenHeight+60}>
      <FlatList
      style={{
        alignSelf: 'center',
      }}
      width={'96%'}
        data={data}
        renderItem={({ item }) => (
          <Pressable
            key={item.level_id}
            onPress={() =>
              navigation.navigate('Subjects', { level_id: item.level_id, level_name: item.level })
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
                    uri: item.level_img,
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
                    {item.level}
                  </Text>
                  <Text
                    color="emerald.500"
                    _dark={{
                      color: 'emerald.500',
                    }}
                  >
                    Learnify Verfied
                  </Text>
                </VStack>
                <Spacer />
                <Text mr={'3'} mt={3} color={'#8d9096'}>{item.subjectsCount}</Text>
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.level_id}
      />
    </Box>
  );
};

export const LevelScreen = ({ navigation }: any) => {
  const { isLoading, data } = GetAllLevels();
  return (
    <SafeAreaView>
      <Text bg={'white'} fontSize={'3xl'} bold> Explore all Levels</Text>
      <Divider />
      <Divider />
      <Box p={0} height={'full'} bg={'#91919163'}>
        {isLoading ? (
          <Spinner />
        ) : (
            <Example navigation={navigation} data={data} />
        )}
      </Box>
    </SafeAreaView>
  );
};
