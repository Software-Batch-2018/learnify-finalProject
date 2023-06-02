import React from 'react';
import { ViewerAnswer } from './viewer.answer';
import { IQuiz } from './viewer';
import { View, StyleSheet } from 'react-native';
import { Box, Radio, Text, useToast } from 'native-base';

type Props = {
  quiz: IQuiz;

  onClickAnswer?: (questionIndex: number, answerIndex: number) => void;
  answers?: number[];
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    margin: 10,
    width: 380,
    borderRadius: 4,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export function ViewerQuestions({
  answers,
  onClickAnswer,
  quiz,
}: Props): React.ReactElement {
  const toast = useToast();
  if (answers && answers.length !== quiz.questions.length) {
    toast.show({ description: 'Something went wrong' });
  }

  return (
    <Box>
      {quiz.questions.map((question, questionIndex) => {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>{question.questionTitle}</Text>
            {question.answerOptions.map((answerOption, answerIndex) => {
              const answerStatus = statusFromAnswerOption(
                answerIndex,
                question.answerIndex,
                answers?.[questionIndex]
              );

              return (
                <ViewerAnswer
                  label={answerOption.label}
                  groupName={question.questionTitle}
                  answerStatus={answerStatus}
                  index={answerIndex}
                  onClick={() => onClickAnswer?.(questionIndex, answerIndex)}
                />
              );
            })}
          </View>
        );
      })}
    </Box>
  );
}

export type IAnswerStatus =
  | 'unanswered'
  | 'answered'
  | 'incorrect'
  | 'correct'
  | 'actual';

function statusFromAnswerOption(
  answerIndex: number,
  actualAnswerIndex: number,
  guessedAnswerIndex?: number
): IAnswerStatus {
  const isGuessedAnswer = guessedAnswerIndex === answerIndex;
  const isActualAnswer = actualAnswerIndex === answerIndex;

  if (guessedAnswerIndex === undefined) return 'unanswered';
  if (isActualAnswer && isGuessedAnswer) return 'correct';
  if (isActualAnswer) return 'actual';
  if (isGuessedAnswer) return 'incorrect';
  return 'answered';
}
