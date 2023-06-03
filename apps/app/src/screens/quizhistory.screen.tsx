import { Box, Center, Heading, ScrollView, Spinner, Text } from 'native-base';
import React from 'react';
import { VictoryPie } from 'victory-native';
import { GetUserQuizHistories } from '../query/user';
import { UserHistoryCard } from '../components/userquizhistory';
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
    <Box mt={4}>
      <ScrollView>
        <Center>
          <Heading>Overall History</Heading>
        </Center>
        {isLoading ? (
          <Spinner />
        ) : (
          <Box>
            <VictoryPie
              data={[
                { x: 'Correct', y: data.corrects },
                { x: 'Incorrect', y: data.incorrects },
              ]}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              colorScale={['#478036', '#265182']}
            />
            <Box m={3}>
              {data.quizHistory.map((quiz: QuizHistoryType) => (
                <UserHistoryCard quizData={quiz} title={quiz.quiz.title} />
              ))}
            </Box>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
}
