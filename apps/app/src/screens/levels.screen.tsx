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
} from 'native-base';
import { GetAllLevels } from '../query/levels';
import { Pressable } from 'react-native';

const Example = ({ data, navigation }: { data: any[]; navigation: any }) => {
  return (
    <Box bg={'white'}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            key={item.level_id}
            onPress={() =>
              navigation.navigate('Subjects', { level_id: item.level_id })
            }
          >
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.100',
              }}
              borderColor="gray.100"
              pl={['0', '4']}
              pr={['0', '5']}
              py="2"
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
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.level}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    Learnify Verfied
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
    <Box p={3} height={'full'}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Example navigation={navigation} data={data.items} />
      )}
    </Box>
  );
};
