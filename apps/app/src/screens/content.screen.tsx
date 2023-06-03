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
} from 'native-base';
import { InfoBox } from '../components/info';
import { GetAllContents } from '../query/content';

const Example = ({ data, navigation }: { data: any[]; navigation: any }) => {
  return (
    <Box bg={'white'}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            key={item.subject_id}
            onPress={() =>
              navigation.navigate('MainContent', {
                title: item.content_title,
                image: item.title_image,
                course_id: item.content_id,
              })
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
                    uri: item.title_image,
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
                    {item.content_title}
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
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.content_id}
      />
    </Box>
  );
};

export const ContentScreen = ({ route, navigation }: any) => {
  const { params } = route;
  const { isLoading, data } = GetAllContents(params.subject_id);

  return (
    <Box p={3}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data && data.items.length > 0 ? (
            <Example data={data.items} navigation={navigation} />
          ) : (
            <InfoBox
              title="No Contents!"
              description="There is no contents for this subjects currently. We will be adding soon!"
            />
          )}
        </>
      )}
    </Box>
  );
};
