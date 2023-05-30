import { CreateLevel, CreateLevelPayload } from '../../utils/courses';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Modal } from '../modal';
import { Button } from '@finalproject/ui';

interface AddLevelModalProps {
  addLevelModal: boolean;
  setAddLevelModal: Dispatch<SetStateAction<boolean>>;
  refetch?: any;
}

export const AddLevelModal = ({
  addLevelModal,
  setAddLevelModal,
  refetch,
}: AddLevelModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const img = watch('level_img');
  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: CreateLevelPayload) => {
      const data = await CreateLevel(payload);
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully Added!');
        reset();
        setAddLevelModal(false);
        refetch();
      }
    },
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <Modal modal={addLevelModal} setModal={setAddLevelModal}>
      <div className="p-5 w-[40vw]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <h1 className="font-semibold">Add Level</h1>
            <div>
              <label>Level Name</label>
              <input
                {...register('level')}
                placeholder="Level"
                required
                className="input-field"
              />
            </div>
            <div>
              <label>Level Image</label>
              <input
                {...register('level_img', {
                  pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                })}
                placeholder="Level Image"
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
