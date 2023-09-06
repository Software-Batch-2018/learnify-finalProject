import { Button } from '@finalproject/ui';
import { CreateContenPayload, CreateContent } from '../../utils/courses';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Modal } from '../modal';
import RichTextEditor from '../RichTextEditor';
import toast from 'react-hot-toast';
import { Checkbox } from 'primereact/checkbox';

interface AddContentModalProps {
  addContentModal: boolean;
  setAddContentModal: Dispatch<SetStateAction<boolean>>;
  refetch?: any;
  contentData?: any;
}

export const AddContentModal = ({
  addContentModal,
  setAddContentModal,
  refetch,
  contentData,
}: AddContentModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const img = watch('title_img');
  const [checked, setChecked] = useState<any>(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (payload: CreateContenPayload) => {
      const data = await CreateContent(payload);
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully Added!');
        reset();
        setAddContentModal(false);
        refetch();
      }
    },
  });

  const onSubmit = (data: any) => {
    mutate({ ...data, content: content, auto_quiz: checked });
  };

  const [content, setContent] = useState('');

  return (
    <Modal modal={addContentModal} setModal={setAddContentModal}>
      <div className="p-5 h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <h1 className="font-semibold">Add Content</h1>
            <div>
              <label>Topic Name</label>
              <input
                {...register('content_title')}
                placeholder="Linked List"
                required
                className="input-field"
              />
            </div>
            <div>
              <label>Topic Image</label>
              <input
                {...register('title_img', {
                  pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                })}
                placeholder="Topic Image"
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
            <div className="flex align-items-center">
              <Checkbox
                onChange={(e) => setChecked(e.checked)}
                checked={checked}
              ></Checkbox>
              <label className="ml-2 italic text-gray-500">
                Auto Add Quiz and Question Answers
              </label>
            </div>
            <div className="">
              <label>Content</label>
              <RichTextEditor defaultValue={content} onChange={setContent} />
            </div>
            <input
              type={'hidden'}
              {...register('subject_id')}
              value={contentData && Object.keys(contentData)[0]}
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
