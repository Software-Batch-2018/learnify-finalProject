import React from 'react';
import { Feather } from '@expo/vector-icons';
import { ResultsFromQuiz } from './resultsfromquiz';
import { Box, HStack, Text, View } from 'native-base';

type Props = ResultsFromQuiz;

export function QuizResults({ correct, incorrect, percentage }: Props) {
  return (
    <Box
      m={4}
      p={4}
      borderColor={'gray.200'}
      borderRadius={2}
      rounded={'lg'}
      borderWidth={1}
    >
      <Text fontSize={'xl'}>Results</Text>
      <HStack
        mt={2}
        p={2}
        justifyContent={'space-between'}
        borderColor={'gray.200'}
        borderRadius={2}
        rounded={'lg'}
        borderWidth={1}
        bg={'red.100'}
      >
        <HStack
          style={{ position: 'relative' }}
          alignItems={'center'}
          space={'2'}
          zIndex={10}
        >
          <Feather name="check" size={14} />
          <Text zIndex={50}>{correct} correct</Text>
        </HStack>

        <HStack
          style={{ position: 'relative', left: 55 }}
          zIndex={10}
          alignItems={'center'}
          space={'2'}
        >
          <Text>{incorrect} incorrect</Text>
          <Feather name="x" size={14} />
        </HStack>
        <Box
          bg={'green.100'}
          style={{
            width: percentage,
            alignItems: 'center',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        />
      </HStack>
    </Box>
  );
}
