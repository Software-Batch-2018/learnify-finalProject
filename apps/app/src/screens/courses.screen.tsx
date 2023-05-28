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

const Example = ({ data }: { data: any[] }) => {
  return (
    <Box bg={'white'}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default () => {
  const { isLoading, data } = GetAllLevels();
  return (
    <Box p={3}>{isLoading ? <Spinner /> : <Example data={data.items} />}</Box>
  );
};
