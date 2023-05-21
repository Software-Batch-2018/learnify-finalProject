import React from 'react';
import { Input, LabelAndInput } from './labelandInput';
import { IAnswerOption } from './types';

const BLANK_ANSWER: IAnswerOption = { label: '' };

interface AnswerSetProps {
  answerOptions: IAnswerOption[];
  correctAnswerIndex: number;
  onUpdate: (updatedAnswers: IAnswerOption[]) => void;
  onMarkCorrect: (index: number) => void;
}

export function BuilderAnswerSet({
  answerOptions,
  correctAnswerIndex,
  onUpdate: _onUpdate,
  onMarkCorrect: _onMarkCorrect,
}: AnswerSetProps) {
  function onCreate(e: React.MouseEvent) {
    e.preventDefault();
    _onUpdate([...answerOptions, BLANK_ANSWER]);
  }

  function onDeleteAnswer(e: React.MouseEvent, answerIndex: number) {
    e.preventDefault();
    const updatedAnswers = [...answerOptions];
    updatedAnswers.splice(answerIndex, 1);
    _onUpdate(updatedAnswers);
  }

  function onUpdate(answerIndex: number, properties: Partial<IAnswerOption>) {
    const updatedAnswers = [...answerOptions];
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      ...properties,
    };
    _onUpdate(updatedAnswers);
  }

  function onMarkCorrect(e: React.MouseEvent, answerIndex: number) {
    e.preventDefault();
    _onMarkCorrect(answerIndex);
  }

  return (
    <>
      {answerOptions.map((answer, answerIndex) => (
        <section key={answerIndex} className="flex items-center">
          <LabelAndInput
            label={
              answerIndex === correctAnswerIndex
                ? 'Correct Answer'
                : 'Wrong Answer'
            }
            labelIcon={
              <>{answerIndex === correctAnswerIndex ? '✅ ' : '❌ '}</>
            }
            onChange={(value) => onUpdate(answerIndex, { label: value })}
            value={answer.label}
            onRenderInput={(inputProps) => (
              <div className="flex w-full">
                <Input className="w-full" {...inputProps} />
                <button
                  className="rounded-half px-[15px] bg-white border text-gray-400 text-[10px] ml-[10px] flex-grow-0"
                  onClick={(e) => onMarkCorrect(e, answerIndex)}
                >
                  Mark Correct
                </button>
                <button
                  className="rounded-half px-[15px] bg-white border text-gray-400 text-[10px] ml-[10px] flex-grow-0"
                  onClick={(e) => onDeleteAnswer(e, answerIndex)}
                >
                  X
                </button>
              </div>
            )}
          />
        </section>
      ))}

      <button
        className="rounded-half p-[5px] bg-green-200 text-green-500 text-[12px]"
        onClick={onCreate}
      >
        Add Answer
      </button>
    </>
  );
}
