import { Box, Center, Heading, ScrollView, Spinner, Text } from 'native-base';
import React from 'react';
import { VictoryPie } from 'victory-native';
import { GetUserQuizHistories } from '../query/user';
import { UserHistoryCard } from '../components/userquizhistory';
import { ImageBackground } from 'react-native';
export interface QuizHistoryType {
  id: number;
  numberOfCorrectAnswers: number;
  numberOfWrongAnswers: number;
  quiz: {
    quiz_id: string;
    title: string;
  };
}

export default function UserQuizHistory({ navigation }: any) {
  const { isLoading, data } = GetUserQuizHistories();
  return (
    <Box bg={'blue.100'} h={'100%'}>
      <ImageBackground
        source={require('../../assets/images/Background.jpg')}
        imageStyle={{ opacity: 0.1 }}
        style={{}}
      >
        <ScrollView mt={4}>
          <Center>
            <Heading>Overall History</Heading>
          </Center>
          {isLoading ? (
            <Spinner />
          ) : (
            <Box>
              {data.total === 0 ? (
                <Box>
                  <Center mx={4} mt={4}>
                    <Text textAlign={'center'} fontSize={'md'}>
                      Looks like you haven't played any quizzes yet! Start
                      playing to unlock your statistics.
                    </Text>
                  </Center>
                </Box>
              ) : (
                <Box>
                  <VictoryPie
                    data={[
                      { x: 'Correct', y: data.corrects },
                      { x: 'Incorrect', y: data.incorrects },
                    ]}
                    labels={({ datum }) => `${datum.x}: ${datum.y}`}
                    colorScale={['#478036', '#55191b']}
                    style={{ labels: { fill: 'white' } }}
                    labelRadius={({ innerRadius }) =>
                      (innerRadius as number) + 30
                    }
                  />
                  <Center>
                    <Text fontWeight={'semibold'} fontSize={'lg'}>
                      Total Quiz Played: {data.total}
                    </Text>
                  </Center>
                </Box>
              )}

              <Box m={3}>
                {data.quizHistory.map((quiz: QuizHistoryType) => (
                  <UserHistoryCard
                    key={quiz.id}
                    quizData={quiz}
                    title={quiz.quiz.title}
                  />
                ))}
              </Box>
            </Box>
          )}
        </ScrollView>
      </ImageBackground>
    </Box>
  );
}
