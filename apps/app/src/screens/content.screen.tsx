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
  Icon
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { InfoBox } from '../components/info';
import { GetAllContents } from '../query/content';
import { Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const Example = ({ data, navigation }: { data: any[]; navigation: any }) => {
  return (
    <Box bg={'#ffffff'} >
      <FlatList
        style={{
          alignSelf: 'center',
        }}
        width={'100%'}
        data={data}
        renderItem={({ item }) => (
          <Pressable
            key={item.content_id}
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
                borderColor: 'gray.300',
              }}
              borderColor="gray.300"
              py={3}
              px={6}
              bg={'white'}
              shadow={1}
            >
              <HStack space={[2, 3]} justifyContent="space-between">
                <Avatar
                  size="55px"
                  source={{
                    uri: item.title_image,
                  }}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: '#5d6065',
                    }}
                    color="#5d6065"
                    bold
                    fontSize={'2xl'}
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
    <Box height={screenHeight - 60}>
      <Box bg={'#5d6065'} h={'20%'}>
        <Box flexDirection={'row-reverse'}>
          <Icon
            mt={2}
            mr={8}
            color={'white'}
            size={39}
            as={<AntDesign name="heart" />}
          />
        </Box>
        <Box ml={2} mt={2}>
          <HStack space={[2, 3]} justifyContent="space-between">
            <Avatar
              size="60px"
              source={{
                uri: route.params.subject_img,
              }}
            />
            <VStack>
              <Text
                _dark={{
                  color: 'white',
                }}
                color="white"
                fontSize={20}
                bold
              >
                {route.params.subject_name}
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
      </Box>
      <Box bg={'#5d6065'} h={'17%'}>
        <Box bg={'white'} h={'100%'} w={'100%'} borderTopRadius={20}
          borderBottomWidth="1"
          _dark={{
            borderColor: '#5d6065',
          }}
          borderColor="#5d6065">
          <Text fontSize={45} bold ml={3} mt={3} color={'#5d6065'}>Course Syllabus</Text>
          <Text fontSize={20} ml={3} color={'#8d9096'}>{params.count} Lessons</Text>
        </Box>
      </Box>
      <Box p={0} bg={'white'}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box>
            {data && data.items.length > 0 ?
              (
                <Example data={data.items} navigation={navigation} />
              ) : (
                <InfoBox
                  title="No Contents!"
                  description="There is no contents for this subjects currently. We will be adding soon!"
                />
              )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
