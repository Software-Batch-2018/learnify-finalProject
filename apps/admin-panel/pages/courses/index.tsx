/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from 'react';

import { useGetAllCourses } from '../../utils/queryfn/courses';
import { Modal } from '../../components/modal';
import { QuizBuilder } from '../../components/quiz/quiz';
import { createLevelMutation } from '../../utils/queryfn/mutation';
import { toast } from 'react-hot-toast';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CourseTable = () => {
  const [quizModal, setQuizModal] = React.useState(false);
  const [expandedRows, setExpandedRows] = useState<any>(null);
  const [subjectExpandedRows, setSubjectExpandedRows] = useState<any>(null);

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
        <button className="btn btn-fill-gray btn-xxs">View Content</button>

        <button className="btn btn-fill-danger btn-xxs">Delete</button>
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
  const subjectAllowExpansion = (rowData: any) => {
    return rowData.contents.length > 0;
  };
  const allowExpansion = (rowData: any) => {
    return rowData.subjects.length > 0;
  };

  const contentExpansionTemplate = (data: any) => {
    return (
      <div className="p-3 bg-blue-100">
        <p className="font-semibold text-lg text-blue-500">
          Content for {data.subject_name}
        </p>
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

  const subjectExpansionTemplate = (data: any) => {
    return (
      <div className="p-3 bg-green-100">
        <p className="font-semibold text-lg text-green-500">
          Subjects for {data.level}
        </p>
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
          <Column expander={subjectAllowExpansion} style={{ width: '5rem' }} />

          <Column field="subject_name" header="Subject Name" sortable></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
        </DataTable>
      </div>
    );
  };
  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        {isLoading ? (
          'Loading'
        ) : (
          <DataTable
            removableSort
            value={data.items}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            // onRowExpand={onRowExpand}
            // onRowCollapse={onRowCollapse}
            rowExpansionTemplate={subjectExpansionTemplate}
            dataKey="level_id"
            tableStyle={{ minWidth: '60rem' }}
          >
            <Column expander={allowExpansion} style={{ width: '5rem' }} />
            <Column field="level" header="Level" sortable />
            <Column header="Image" body={imageBodyTemplate}></Column>
          </DataTable>
        )}
      </div>

      <Modal modal={quizModal} setModal={setQuizModal}>
        <div className="h-[90vh] w-[60vw] p-6 overflow-y-scroll">
          <QuizBuilder
            course_id={contentDetail.course_id}
            course_name={contentDetail.course_name}
          />
        </div>
      </Modal>
    </div>
  );
};
export default CourseTable;
