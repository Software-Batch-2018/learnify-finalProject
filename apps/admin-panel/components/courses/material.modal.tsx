import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from '../modal';
import { TabView, TabPanel } from 'primereact/tabview';
import {
  addMaterial,
  addQa,
  useGetMaterial,
} from '../../utils/queryfn/material';
import { Button } from '@learnify/ui';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
interface MaterialModalProps {
  materialModal: boolean;
  setMaterialModal: Dispatch<SetStateAction<boolean>>;
  course_id: string;
}

export const MaterialModal = ({
  materialModal,
  setMaterialModal,
  course_id,
}: MaterialModalProps) => {
  const { isLoading, data, refetch } = useGetMaterial(course_id);

  const {
    register: qaRegister,
    handleSubmit: qaSubmit,
    reset: resetQA,
  } = useForm();

  const {
    mutate: addQAMutate,
    data: questionMutateData,
    isLoading: qaLoading,
  } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await addQa(payload, course_id);
      if (data.error) {
        toast.error('Error');
        refetch();
      } else {
        toast.success('Success');
      }
      return data;
    },
  });

  const { register: materialRegister, handleSubmit: materialSubmit } =
    useForm();

  const { mutate: addMaterialMutate, isLoading: materialLoading } = useMutation(
    {
      mutationFn: async (payload: any) => {
        const data = await addMaterial(payload, course_id);
        if (data.error) {
          toast.error('Error');
        } else {
          toast.success('Success');
          refetch();
        }
        return data;
      },
    }
  );

  const onMaterialSubmit = (data: any) => {
    addMaterialMutate(data);
  };

  const onQaSubmit = (data: any) => {
    const payload = {
      questions: [{ ...data }],
    };
    addQAMutate(payload);
    resetQA();
  };
  return (
    <Modal modal={materialModal} setModal={setMaterialModal}>
      <TabView>
        <TabPanel header="Question and Answers">
          <form onSubmit={qaSubmit(onQaSubmit)} className="space-y-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Question
              </label>
              <input
                {...qaRegister('questionTitle', { required: true })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Question"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Answer
              </label>
              <textarea
                {...qaRegister('answer', { required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Answer"
                required
              />
            </div>
            <Button type="submit" isLoading={qaLoading} name="Submit" />
          </form>
          {!isLoading && data.length && data[0].qa_entity && (
            <>
              {data[0].qa_entity.qa_question.map(
                (
                  question: {
                    question_id: string;
                    questionTitle: string;
                    answer: string;
                  },
                  index: number
                ) => (
                  <div className="mb-4" key={question.question_id}>
                    <p className="font-bold">
                      {index + 1}: {question.questionTitle}
                    </p>
                    <p>{question.answer}</p>
                  </div>
                )
              )}
            </>
          )}
        </TabPanel>
        <TabPanel header="Materials">
          <form
            onSubmit={materialSubmit(onMaterialSubmit)}
            className="space-y-2"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Add Youtube Link
              </label>
              <input
                {...materialRegister('material_link')}
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <Button type="submit" isLoading={materialLoading} name="Submit" />
          </form>
          {!isLoading && data.length > 0 && (
            <>
              {data[0].material.map(
                (
                  question: {
                    material_link: string;
                    qa_id: string;
                  },
                  index: number
                ) => (
                  <div className="my-6" key={question.qa_id}>
                    <p className="font-bold">
                      {index + 1}: {question.material_link}
                    </p>
                  </div>
                )
              )}
            </>
          )}
        </TabPanel>
      </TabView>
    </Modal>
  );
};
