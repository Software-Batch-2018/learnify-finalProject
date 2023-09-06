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
  View,
} from 'native-base';
import { GetAllLevels } from '../query/levels';
import { Pressable } from 'react-native';
import { Dimensions, ImageBackground } from 'react-native';

const Example = ({ data, navigation }: { data: any[]; navigation: any }) => {
  return (
    <Box>
      <FlatList
        style={{
          alignSelf: 'center',
        }}
        width={'96%'}
        data={data}
        mt={3}
        renderItem={({ item }) => (
          <Pressable
            key={item.level_id}
            onPress={() =>
              navigation.navigate('Subjects', {
                level_id: item.level_id,
                level_name: item.level,
              })
            }
          >
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.100',
              }}
              borderColor="gray.100"
              py={3}
              px={5}
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
                    {item.subjectsCount} Total subjects
                  </Text>
                </VStack>
                <Spacer />
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
    <Box>
      <ImageBackground
        source={require('../../assets/images/Background.jpg')}
        imageStyle={{ opacity: 0.1 }}
        style={{}}
      >
        <View
          py={1}
          px={4}
          flexDirection={'row'}
          justifyContent={'space-between'}
          justifyItems={'center'}
          alignItems={'center'}
        >
          <Text fontSize={'3xl'} bold color={'emerald.500'}>
            Explore All Levels
          </Text>
        </View>
        <Box p={0} height={'full'}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Example navigation={navigation} data={data} />
          )}
        </Box>
      </ImageBackground>
    </Box>
  );
};
