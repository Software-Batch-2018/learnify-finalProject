import React, { Fragment } from 'react';
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
import { GetAllSubjects } from '../query/subjects';
import { InfoBox } from '../components/info';

const Example = ({ data, navigation }: { data: any[]; navigation: any }) => {
  return (
    <Box bg={'white'}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            key={item.subject_id}
            onPress={() =>
              navigation.navigate('Contents', { subject_id: item.subject_id })
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
                    uri: item.subject_img,
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
                        Learnify Verfied Subjects
                      </Text>
                      <CheckIcon size="3" mt="1" color="emerald.500" />
                    </HStack>
                    ;
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export const SubjectScreen = ({ route, navigation }: any) => {
  const { params } = route;
  const { isLoading, data } = GetAllSubjects(params.level_id);
  return (
    <Box p={3}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {data && data.items.length > 0 ? (
            <Example navigation={navigation} data={data.items} />
          ) : (
            <InfoBox
              title="No Subjects!"
              description="There is no subject for this level currently. We will be adding soon!"
            />
          )}
        </>
      )}
    </Box>
  );
};
