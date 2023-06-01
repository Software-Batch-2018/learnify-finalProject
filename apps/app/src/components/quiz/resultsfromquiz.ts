import { IQuiz } from './viewer';

export interface ResultsFromQuiz {
  correct?: number;
  incorrect?: number;
  percentage?: string;
  error: boolean
  message?: string
}

export function resultsFromQuiz(
  quiz: IQuiz,
  answers: number[]
): ResultsFromQuiz {
  const check = _checkForCompletionOrThrow(quiz, answers);
  if(check?.error){
    return check
  }
  const results = { correct: 0, incorrect: 0, percentage: '' };

  answers.forEach((answer, questionIndex) => {
    const isCorrect = quiz.questions[questionIndex].answerIndex === answer;

    if (isCorrect) {
      results.correct++;
    } else {
      results.incorrect++;
    }
  });

  return {
    error: false,
    ...results,
    percentage: `${Math.floor((results.correct / answers.length) * 100)}%`,
  };
}

function _checkForCompletionOrThrow(quiz: IQuiz, answers: number[]) {
  const notAllQuestionsAnswered = answers.length !== quiz.questions.length;
  if (notAllQuestionsAnswered) {
    return {
      error: true,
      message: "Finish the quiz first"
    }
  }
}
