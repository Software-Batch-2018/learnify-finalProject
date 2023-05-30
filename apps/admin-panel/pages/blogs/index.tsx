import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { useFindAllBlogs } from '../../utils/query';
import { useMutation } from 'react-query';
import {
  EditPayload,
  createBlogs,
  deleteBlogs,
  editBlogs,
} from '../../utils/queryfn';
import toast from 'react-hot-toast';
import React from 'react';
import { Modal } from '../../components/modal';
import { useForm } from 'react-hook-form';
import RichTextEditor from '../../components/RichTextEditor';
import { AlertDialog } from '../../components/alert-dialog';
export function Index() {
  const [addBlogModal, setAddBlogModal] = React.useState(false);
  const [viewBlogContent, setViewBlogContent] = React.useState(false);
  const [deleteBlog, setDeleteBlog] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [editContent, editSetContent] = React.useState('');
  const [editId, setEditId] = React.useState('');
  const { data, isLoading, refetch } = useFindAllBlogs();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const img = watch('blog_img');

  const { handleSubmit: handleEdit, register: editRegister } = useForm();
  const { mutate: editMutate } = useMutation({
    mutationFn: async ({ id, payload }: EditPayload) => {
      const data = await editBlogs({ id, payload });
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully Edited!');
        refetch();
      }
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const data = await deleteBlogs({ id });
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Deleted blog!');
        refetch();
      }
    },
  });

  const { mutate: createMutate } = useMutation({
    mutationFn: async (payload: any) => {
      const data = await createBlogs(payload);
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully created new blog!');
        refetch();
      }
    },
  });

  const onSubmit = (data: any) => {
    createMutate({ ...data, content });
    setAddBlogModal(false);
    reset();
    setContent('');
  };

  const editBlog = (data: any) => {
    editMutate({
      id: data.blog_id,
      payload: {
        content: editContent,
      },
    });
    setViewBlogContent(false);
  };

  const imageBodyTemplate = (blog: any) => {
    return <img src={blog.blog_img} alt={blog.blog_img} className="w-14" />;
  };

  const actionBodyTemplate = (blog: any) => {
    return (
      <div className="flex gap-2 justify-center items-center mt-2">
        <button
          className="btn btn-fill-gray btn-xxs"
          onClick={() => {
            editSetContent(blog.content);
            setEditId(blog.blog_id);
            setViewBlogContent(true);
          }}
        >
          View Content
        </button>

        <button
          onClick={() => {
            setEditId(blog.blog_id);
            setDeleteBlog(true);
          }}
          className="btn btn-fill-danger btn-xxs"
        >
          Delete
        </button>
      </div>
    );
  };

  const cellEditor = (options: any) => {
    return textEditor(options);
  };
  const textEditor = (options: any) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const onCellEditComplete = (e: any) => {
    const { rowData, newValue, originalEvent: event } = e;
    if (rowData.title === newValue) return;
    event.preventDefault();
    editMutate({
      id: rowData.blog_id,
      payload: {
        title: newValue,
      },
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl dark:text-white">Blogs</h1>
        <button
          className="btn btn-xs btn-fill-gray"
          onClick={() => setAddBlogModal(true)}
        >
          Add Blog
        </button>
      </div>
      <div
        className="ag-theme-alpine "
        style={{
          height: '50vh',
          width: '100%',
        }}
      >
        {isLoading ? (
          'Loading'
        ) : (
          <DataTable
            value={data.items}
            removableSort
            resizableColumns
            tableStyle={{ minWidth: '45rem' }}
          >
            <Column
              field="title"
              header="Title"
              filter
              sortable
              filterPlaceholder="Search by name"
              style={{ minWidth: '12rem' }}
              editor={(options) => cellEditor(options)}
              onCellEditComplete={onCellEditComplete}
            />
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: '12rem' }}
            ></Column>
          </DataTable>
        )}
      </div>
      <Modal modal={viewBlogContent} setModal={setViewBlogContent}>
        <div className="max-w-3xl p-5 ">
          <form className="space-y-3" onSubmit={handleEdit(editBlog)}>
            <RichTextEditor
              defaultValue={editContent}
              onChange={editSetContent}
            />
            <input type="hidden" {...editRegister('blog_id')} value={editId} />
            <button
              type="submit"
              className="btn btn-sm text-gray-50 bg-green-600"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
      <Modal modal={addBlogModal} setModal={setAddBlogModal}>
        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <h1 className="font-semibold">Add Blog</h1>
              <div>
                <label>Blog Title</label>
                <input
                  {...register('title')}
                  placeholder="Blog Title"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label>Blog Image</label>
                <input
                  {...register('blog_img', {
                    pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  })}
                  placeholder="Blog Image"
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
              <div className="">
                <label>Blog Content</label>
                <RichTextEditor defaultValue={content} onChange={setContent} />
              </div>
              <button
                type="submit"
                className="btn btn-sm text-gray-50 bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <AlertDialog
        onConfirm={() => {
          deleteMutate({ id: editId });
          setDeleteBlog(false);
        }}
        onCancel={() => setDeleteBlog(false)}
        isOpen={deleteBlog}
      />
    </div>
  );
}

export default Index;
