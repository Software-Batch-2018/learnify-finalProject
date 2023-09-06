/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from 'react';
import { useGetAllCourses } from '../../utils/queryfn/courses';
import { Modal } from '../../components/modal';
import { QuizBuilder } from '../../components/quiz/quiz';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AddLevelModal } from '../../components/courses/addlevel.modal';
import { AddSubjectModal } from '../../components/courses/addSubject.modal';
import { AddContentModal } from '../../components/courses/addContent.modal';
import RichTextEditor from '../../components/RichTextEditor';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { editCourseContent } from '../../utils/courses';
import toast from 'react-hot-toast';
import { Button } from '@finalproject/ui';
import { MaterialModal } from '../../components/courses/material.modal';

const CourseTable = () => {
  const [quizModal, setQuizModal] = React.useState(false);
  const [expandedRows, setExpandedRows] = useState<any>(null);
  const [subjectExpandedRows, setSubjectExpandedRows] = useState<any>(null);
  const [materialModal, setMaterialModal] = React.useState<boolean>(false);
  const [contentDetail, setContentDetail] = React.useState({
    course_id: '',
    course_name: '',
  });
  const { data, isLoading, refetch } = useGetAllCourses();
  const containerStyle = useMemo(() => ({ width: '100%', height: '80vh' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const actionBodyTemplate = (data: any) => {
    return (
      <div className="flex gap-2 justify-center items-center mt-2">
        <button
          onClick={() => {
            setContentDetail({
              course_id: data.content_id,
              course_name: data.content_title,
            });
            setQuizModal(true);
          }}
          className="btn bg-green-600 text-white btn-xxs"
        >
          Add Quiz
        </button>
        <button
          onClick={() => {
            editSetContent(data.content);
            setEditId(data.content_id);
            setViewCourseContent(true);
          }}
          className="btn btn-fill-gray btn-xxs"
        >
          View Content
        </button>
        <button
          onClick={() => {
            setMaterialModal(true);
            setContentDetail({
              course_id: data.content_id,
              course_name: data.content_title,
            });
          }}
          className="btn btn-fill-blue btn-xxs"
        >
          Materials
        </button>
      </div>
    );
  };

  const imageBodyTemplate = (data: any) => {
    return (
      <img
        src={data.level_img || data.subject_img}
        alt={data.level_img}
        className="w-14"
      />
    );
  };

  const [addContentModal, setAddContentModal] = React.useState(false);
  const contentExpansionTemplate = (data: any) => {
    return (
      <div className="p-3 bg-blue-100">
        <div className="gap-2 p-2 flex flex-wrap items-center justify-between">
          <p className="font-semibold text-lg text-blue-500">
            Contents for {data.subject_name}
          </p>
          <button
            onClick={() => setAddContentModal(true)}
            className="btn btn-xs btn-fill-gray"
          >
            Add Content
          </button>
        </div>
        <DataTable removableSort value={data.contents}>
          <Column
            field="content_title"
            header="Content Title"
            sortable
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '12rem' }}
          ></Column>
        </DataTable>
      </div>
    );
  };

  const [addSubjectModal, setAddSubjectModal] = React.useState(false);

  const subjectExpansionTemplate = (data: any) => {
    return (
      <div className="p-3 bg-green-100">
        <div className="gap-2 p-2 flex flex-wrap items-center justify-between">
          <p className="font-semibold text-lg text-green-500">
            Subjects for {data.level}
          </p>
          <button
            onClick={() => setAddSubjectModal(true)}
            className="btn btn-xs btn-fill-gray"
          >
            Add Subjects
          </button>
        </div>
        <DataTable
          removableSort
          value={data.subjects}
          expandedRows={subjectExpandedRows}
          onRowToggle={(e) => setSubjectExpandedRows(e.data)}
          // onRowExpand={onRowExpand}
          // onRowCollapse={onRowCollapse}
          rowExpansionTemplate={contentExpansionTemplate}
          dataKey="subject_id"
          tableStyle={{ minWidth: '60rem' }}
        >
          <Column expander style={{ width: '5rem' }} />

          <Column field="subject_name" header="Subject Name" sortable></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
        </DataTable>
      </div>
    );
  };

  const [addLevelModal, setAddLevelModal] = React.useState(false);

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-xl text-900 font-bold">Levels</span>
      <button
        onClick={() => setAddLevelModal(true)}
        className="btn btn-xs btn-fill-gray"
      >
        Add Level
      </button>
    </div>
  );

  const [editContent, editSetContent] = React.useState('');
  const [editId, setEditId] = React.useState('');
  const [viewCourseContent, setViewCourseContent] = React.useState(false);
  const { handleSubmit: handleEdit } = useForm();
  const { mutate: editMutate, isLoading: editLoading } = useMutation({
    mutationFn: async ({ id, payload }: any) => {
      const data = await editCourseContent({ content_id: id, payload });
      if (data.error) {
        toast.error(data.message);
      } else {
        toast.success('Successfully Edited!');
        refetch();
      }
    },
  });
  const editBlog = (data: any) => {
    editMutate({
      id: editId,
      payload: {
        content: editContent,
      },
    });
    setViewCourseContent(false);
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        {isLoading ? (
          'Loading'
        ) : (
          <DataTable
            header={header}
            removableSort
            value={data}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            // onRowExpand={onRowExpand}
            // onRowCollapse={onRowCollapse}
            rowExpansionTemplate={subjectExpansionTemplate}
            dataKey="level_id"
            tableStyle={{ minWidth: '60rem' }}
          >
            <Column expander style={{ width: '5rem' }} />
            <Column field="level" header="Level" sortable />
            <Column header="Image" body={imageBodyTemplate}></Column>
          </DataTable>
        )}
      </div>

      <Modal height="full" modal={quizModal} setModal={setQuizModal}>
        <div className=" p-6 overflow-y-scroll">
          <QuizBuilder
            course_id={contentDetail.course_id}
            course_name={contentDetail.course_name}
          />
        </div>
      </Modal>

      <AddLevelModal
        addLevelModal={addLevelModal}
        setAddLevelModal={setAddLevelModal}
        refetch={refetch}
      />

      <AddSubjectModal
        addSubjectModal={addSubjectModal}
        setAddSubjectModal={setAddSubjectModal}
        refetch={refetch}
        subjectData={expandedRows}
      />

      <AddContentModal
        addContentModal={addContentModal}
        setAddContentModal={setAddContentModal}
        contentData={subjectExpandedRows}
        refetch={refetch}
      />

      <MaterialModal
        materialModal={materialModal}
        setMaterialModal={setMaterialModal}
        course_id={contentDetail.course_id}
      />

      <Modal modal={viewCourseContent} setModal={setViewCourseContent}>
        <div className=" p-5 ">
          <form className="space-y-3" onSubmit={handleEdit(editBlog)}>
            <RichTextEditor
              defaultValue={editContent}
              onChange={editSetContent}
            />
            <Button name="Submit" isLoading={editLoading} type="submit" />
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default CourseTable;
