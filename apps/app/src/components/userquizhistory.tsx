import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Icon,
  Text,
  HStack,
  Avatar,
  useColorModeValue,
} from 'native-base';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
export const UserHistoryCard = () => {
  return (
    <Box
      rounded="8"
      overflow="hidden"
      borderWidth="1"
      borderColor="coolGray.300"
      maxW="96"
      shadow="3"
      bg="coolGray.100"
      p="5"
    >
      <Stack space={6}>
        <Stack space={3}>
          <Heading
            size="lg"
            color={useColorModeValue('blueGray.700', 'blueGray.100')}
          >
            Dressing room
          </Heading>
          <Text
            color={useColorModeValue('blueGray.500', 'blueGray.200')}
            fontWeight="medium"
            fontSize="xs"
          >
            Design the new dressing room for the upcoming tour.
          </Text>
        </Stack>
        <HStack
          justifyContent="space-between"
          alignItems="flex-end"
          flexShrink={1}
        >
          <Stack space={3}>
            <HStack space={3} alignItems="center" flexShrink={1}>
              <Icon
                name="grid"
                as={MaterialCommunityIcons}
                color="blueGray.700"
              />
              <Text
                flexShrink={1}
                fontWeight="medium"
                color={useColorModeValue('blueGray.500', 'blueGray.200')}
              >
                Task: KitchenSink
              </Text>
            </HStack>
            <HStack space={3} alignItems="center">
              <Icon
                name="calendar"
                as={MaterialCommunityIcons}
                color="blueGray.700"
              />
              <Text
                color={useColorModeValue('blueGray.500', 'blueGray.200')}
                fontWeight="medium"
              >
                Date: 10.04.2021
              </Text>
            </HStack>
          </Stack>
        </HStack>
      </Stack>
    </Box>
  );
};
