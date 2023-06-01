import React, { useState } from 'react';
import { ViewerQuestions } from './viewer.question';
import { ResultsFromQuiz, resultsFromQuiz } from './resultsfromquiz';
import { QuizResults } from './viewer.result';
import { InfoBox } from '../info';
import { Box, Button, Center, Heading, useToast } from 'native-base';

export interface IAnswerOption {
  label: string;
}
export interface IQuestion {
  questionTitle: string;
  answerOptions: IAnswerOption[];
  answerIndex: number;
  codeExample?: string;
  image?: string;
}

export interface IQuiz {
  title: string;
  questions: IQuestion[];
  author?: string;
  backLink?: string;
}

export function ViewerPage({ data }: { data: IQuiz }) {
  const toast = useToast();

  const [initialized] = useState(
    ():
      | {
          error: string;
          parsedQuiz: undefined;
        }
      | { error: undefined; parsedQuiz: IQuiz } => {
      try {
        return {
          error: undefined,
          parsedQuiz: data,
        };
      } catch (e) {
        console.error('Failed to load quiz');
        return {
          error: 'Failed to load quiz',
          parsedQuiz: undefined,
        };
      }
    }
  );

  const [quizResults, setQuizResults] = useState<ResultsFromQuiz>();
  const [answers, setAnswers] = useState<number[]>([]);
  function onFinishClick() {
    const result = resultsFromQuiz(initialized.parsedQuiz!, answers);
    if (result.error) {
      toast.show({
        description: result.message,
        placement: 'bottom',
      });
      return null;
    } else {
      setQuizResults(result);
    }
  }

  function onClickAnswer(questionIndex: number, answerIndex: number) {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
    console.log(answers, 'what is here');
  }

  if (initialized.error === undefined) {
    const { parsedQuiz } = initialized;

    return (
      <Box>
        <Center>
          <Heading mt={2} style={{ marginBottom: 10 }}>
            {parsedQuiz.title}
          </Heading>
        </Center>

        <ViewerQuestions
          quiz={parsedQuiz}
          answers={quizResults ? answers : undefined}
          onClickAnswer={onClickAnswer}
        />

        {!quizResults ? (
          <Button
            m={3}
            colorScheme="success"
            size="lg"
            onPress={onFinishClick}
            shadow={'4'}
          >
            Finish
          </Button>
        ) : (
          <QuizResults {...quizResults} />
        )}
      </Box>
    );
  } else {
    return <InfoBox title="Error" description="Something wrong happened" />;
  }
}
