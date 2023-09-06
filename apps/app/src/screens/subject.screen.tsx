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
  View,
} from 'native-base';
import { GetAllSubjects } from '../query/subjects';
import { InfoBox } from '../components/info';
import { Dimensions, ImageBackground } from 'react-native';
const screenHeight = Dimensions.get('window').height;
const Example = ({ data, navigation }: { data: any[]; navigation: any }) => {
  return (
    <Box height={screenHeight - 120}>
      <FlatList
        style={{
          alignSelf: 'center',
        }}
        width={'96%'}
        data={data}
        mt={3}
        renderItem={({ item }) => (
          <Pressable
            key={item.subject_id}
            onPress={() =>
              navigation.navigate('Contents', {
                subject_id: item.subject_id,
                subject_name: item.subject_name,
                subject_img: item.subject_img,
                count: item.contentsCount,
              })
            }
          >
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: 'gray.100',
              }}
              borderColor="gray.100"
              bg={'white'}
              py={3}
              px={5}
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
                        {item.contentsCount} Total courses
                      </Text>
                    </HStack>
                  </Text>
                </VStack>
                <Spacer />
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
    <Box>
      <ImageBackground
        source={require('../../assets/images/Background.jpg')}
        imageStyle={{ opacity: 0.1 }}
      >
        <View
          px={4}
          py={3}
          flexDirection={'row'}
          justifyContent={'space-between'}
          justifyItems={'center'}
          alignItems={'center'}
        >
          <Text fontSize={'xl'} bold color={'emerald.500'}>
            {params.level_name}
          </Text>
        </View>
        <Box p={0} h={'full'}>
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
      </ImageBackground>
    </Box>
  );
};
