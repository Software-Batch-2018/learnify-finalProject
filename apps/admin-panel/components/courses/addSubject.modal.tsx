import { CreateSubject, CreateSubjectPayload } from '../../utils/courses';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Modal } from '../modal';
import toast from 'react-hot-toast';
import { Button } from '@learnify/ui';

interface AddSubjectModalProps {
  addSubjectModal: boolean;
  setAddSubjectModal: Dispatch<SetStateAction<boolean>>;
  refetch?: any;
  subjectData?: any;
}

export const AddSubjectModal = ({
  addSubjectModal,
  setAddSubjectModal,
  refetch,
  subjectData,
}: AddSubjectModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const img = watch('subject_img');

  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: CreateSubjectPayload) => {
      const data = await CreateSubject(payload);
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully Added!');
        reset();
        setAddSubjectModal(false);
        refetch();
      }
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <Modal modal={addSubjectModal} setModal={setAddSubjectModal}>
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <h1 className="font-semibold">Add Subject</h1>
            <div>
              <label>Subject Name</label>
              <input
                {...register('subject_name')}
                placeholder="Subject Name"
                required
                type={'text'}
                className="input-field"
              />
            </div>
            <div>
              <label>Subject Image</label>
              <input
                {...register('subject_img', {
                  pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                })}
                placeholder="Subject Image"
                required
                className="input-field"
              />
              {errors.blog_img && (
                <span className="text-red-500 pl-2 text-sm">
                  Invalid URL provided!
                </span>
              )}
              <img
                src={img}
                alt={img}
                className="w-60 h-auto m-2"
                onError={(e: any) =>
                  (e.target.alt = 'Cannot render image right now!')
                }
              />
            </div>
            <input
              type={'hidden'}
              {...register('level_id')}
              value={subjectData && Object.keys(subjectData)[0]}
            />
            <div>
              <Button type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
