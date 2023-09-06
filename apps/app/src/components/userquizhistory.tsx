import React from 'react';
import { Box, Stack, Heading, HStack, useColorModeValue } from 'native-base';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory-native';

export const UserHistoryCard = ({
  title,
  quizData,
}: {
  title: string;
  quizData: any;
}) => {
  return (
    <Box
      my={2}
      rounded="8"
      overflow="hidden"
      borderColor="coolGray.300"
      shadow="1"
      bg="white"
    >
      <Stack px={5} pt={5} space={3}>
        <Heading
          size="lg"
          color={useColorModeValue('blueGray.700', 'blueGray.100')}
        >
          {title}
        </Heading>
      </Stack>
      <VictoryChart domain={{ x: [0, 11], y: [-5, 5] }}>
        <VictoryBar
          data={[
            {
              x: 2,
              y: quizData.numberOfCorrectAnswers,
              label: `Correct: ${quizData.numberOfCorrectAnswers}`,
            },
            {
              x: 4,
              y: -quizData.numberOfWrongAnswers,
              label: `Incorrect: ${quizData.numberOfWrongAnswers}`,
            },
          ]}
          labels={({ datum }) => datum.y}
          style={{
            data: { fill: '#265182' },
            labels: { fill: 'black' },
          }}
          labelComponent={<VictoryLabel />}
        />
      </VictoryChart>
    </Box>
  );
};
