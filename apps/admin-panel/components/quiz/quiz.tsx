import React, { useEffect, useState } from 'react';

import { LabelAndInput } from './builder/labelandInput';
import { IAnswerOption, IQuestion, IQuiz } from './builder/types';
import { BuilderQuestion } from './builder/builderQuestion';
import { BuilderAnswerSet } from './builder/builderAnswerSet';
// import { SchemaViewer } from './builder/schemaViewer';
import { useMutation } from 'react-query';
import { AddOrEditQuiz } from '../../utils/queryfn/quiz';
import toast from 'react-hot-toast';
import { Button } from '@finalproject/ui';

const BLANK_QUESTION: IQuestion = {
  questionTitle: '',
  answerIndex: -1, // TODO: make UI say that an answer index needs to be selected
  answerOptions: [],
};
const BLANK_QUIZ: IQuiz = { title: '', questions: [] };

interface QuizBuilderProps {
  course_id: string;
  course_name: string;
}

export function QuizBuilder({ course_id, course_name }: QuizBuilderProps) {
  const storageKey = `STORED_QUIZ_${course_id}`;

  const [quiz, setQuiz] = useState<IQuiz>(() => {
    try {
      const parsedCachedQuiz = JSON.parse(
        localStorage.getItem(storageKey)!
      ) as unknown as IQuiz;
      if (!parsedCachedQuiz) return BLANK_QUIZ;
      return parsedCachedQuiz;
    } catch (e) {
      return BLANK_QUIZ;
    }
  });

  function onNewQuestionClick(e: React.MouseEvent) {
    e.preventDefault();
    setQuiz((q) => ({ ...quiz, questions: [...q.questions, BLANK_QUESTION] }));
  }

  function onUpdateQuestion(questionIndex: number, updatedQuestion: IQuestion) {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = updatedQuestion;
    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  function onDeleteQuestionClick(index: number) {
    const newQuestions = [...quiz.questions];
    newQuestions.splice(index, 1);

    setQuiz({ ...quiz, questions: newQuestions });
  }

  function onUpdateAnswers(
    questionIndex: number,
    updatedAnswers: IAnswerOption[]
  ) {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].answerOptions = updatedAnswers;
    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  function onMarkCorrect(questionIndex: number, answerIndex: number) {
    const updatedQuestions = [...quiz.questions];

    updatedQuestions[questionIndex].answerIndex = answerIndex;

    setQuiz({ ...quiz, questions: updatedQuestions });
  }

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(quiz));
    }, 0);
  }, [quiz]);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await AddOrEditQuiz(payload, course_id);
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully Added!');
      }
    },
  });

  const handleSubmit = () => {
    mutate(quiz);
  };

  return (
    <>
      <header className="flex justify-between items-center mb-[20px]">
        <h1 className="font-bold text-[32px]">{course_name}</h1>
      </header>

      <form>
        <section className="p-[40px] rounded bg-gray-50 shadow mb-[20px]">
          <LabelAndInput
            label="Title"
            value={course_name}
            onChange={(val) => setQuiz((q) => ({ ...q, title: val }))}
          />
        </section>

        <h2 className="mb-[20px]">Questions</h2>
        <section className="">
          {quiz.questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <BuilderQuestion
                question={question}
                onDelete={() => onDeleteQuestionClick(questionIndex)}
                onUpdate={(updatedQuestion) =>
                  onUpdateQuestion(questionIndex, updatedQuestion)
                }
              >
                <BuilderAnswerSet
                  answerOptions={question.answerOptions}
                  correctAnswerIndex={question.answerIndex}
                  onMarkCorrect={(answerIndex) =>
                    onMarkCorrect(questionIndex, answerIndex)
                  }
                  onUpdate={(updatedAnswers) =>
                    onUpdateAnswers(questionIndex, updatedAnswers)
                  }
                />
              </BuilderQuestion>
            </div>
          ))}
        </section>
        <button
          className="p-[10px] flex justify-center bg-gray-100 text-gray-500 text-lg font-semibold rounded w-full shadow"
          onClick={onNewQuestionClick}
        >
          Add Question
        </button>
      </form>

      {/* <SchemaViewer quiz={quiz} /> */}
      <button
        className="btn btn-xs w-full flex items-center justify-center bg-green-600 text-white mt-6"
        type="submit"
        onClick={() => handleSubmit()}
        disabled={isLoading}
      >
        Submit Quiz
      </button>
    </>
  );
}
