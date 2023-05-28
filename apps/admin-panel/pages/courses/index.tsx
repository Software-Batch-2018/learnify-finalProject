/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useGetAllCourses } from '../../utils/queryfn/courses';
import { Modal } from '../../components/modal';
import { QuizBuilder } from '../../components/quiz/quiz';
import { createLevelMutation } from '../../utils/queryfn/mutation';
import { toast } from 'react-hot-toast';

const CourseTable = () => {
  const [quizModal, setQuizModal] = React.useState(false);
  const [, setRowData] = useState<any[]>([]);
  const [inputRow, setInputRow] = useState<any>({});
  const [nestedInputRow, setNestedInputRow] = useState<any>({});

  const [contentDetail, setContentDetail] = React.useState({
    course_id: '',
    course_name: '',
  });
  const { data, isLoading, refetch } = useGetAllCourses();
  const containerStyle = useMemo(() => ({ width: '100%', height: '80vh' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const extraRow: any = {
    subject_name: 'Pinned Row',
    isNonExpandable: true,
    subject_image: nestedInputRow.subject_image || '', // Use the value from state or an empty string
  };
  const [columnDefs] = useState([
    {
      field: 'level',
      cellRenderer: 'agGroupCellRenderer',
    },
    {
      headerName: 'Level Image',
      field: 'level_img',
      floatingFilter: false,

      cellRenderer: (param: any) => {
        return (
          <div>
            <img alt={param.value} className="w-12" src={param.value} />
          </div>
        );
      },
    },
  ]);

  const detailCellRendererParams = useMemo(() => {
    return {
      // level 2 grid options
      detailGridOptions: {
        columnDefs: [
          {
            headerName: 'Subject Name',
            field: 'subject_name',
            cellRenderer: 'agGroupCellRenderer',
          },
          {
            headerName: 'Subject Image',
            field: 'subject_img',
            cellRenderer: (param: any) => {
              return (
                <div>
                  <img alt={param.value} className="w-12" src={param.value} />
                </div>
              );
            },
          },
        ],
        defaultColDef: {
          flex: 1,
          sortable: true,
          filter: true,
          resizable: true,
          editable: true,
        },
        masterDetail: true,
        // detailRowHeight: 240,
        detailCellRendererParams: {
          // level 3 grid options
          detailGridOptions: {
            columnDefs: [
              { field: 'content_title', cellRenderer: 'agGroupCellRenderer' },
              {
                field: 'title_image',
                headerName: 'Image',
                cellRenderer: (param: { value: string }) => {
                  return (
                    <div>
                      <img
                        alt={param.value}
                        className="w-12"
                        src={param.value}
                      />
                    </div>
                  );
                },
              },
              {
                headerName: 'Action',
                floatingFilter: false,
                cellRenderer: (param: {
                  data: { content_id: string; content_title: string };
                }) => {
                  return (
                    <div className="flex gap-2 justify-center items-center mt-2">
                      <button
                        onClick={() => {
                          setContentDetail({
                            course_id: param.data.content_id,
                            course_name: param.data.content_title,
                          });
                          setQuizModal(true);
                        }}
                        className="btn bg-green-600 text-white btn-xxs"
                      >
                        Add Quiz
                      </button>
                      <button className="btn btn-fill-gray btn-xxs">
                        View Content
                      </button>

                      <button className="btn btn-fill-danger btn-xxs">
                        Delete
                      </button>
                    </div>
                  );
                },
              },
            ],
            defaultColDef: {
              flex: 1,
            },
          },
          getDetailRowData: (params: any) => {
            if (params.data.isExpandable) return;
            params.successCallback(params.data.contents);
          },
        },
      },
      getDetailRowData: (params: any) => {
        params.successCallback([extraRow, ...params.data.subjects]);
      },
    };
  }, []);

  function isEmptyPinnedCell(params: {
    value: null | string;
    node: { rowPinned: string };
  }) {
    return (
      params.node.rowPinned === 'top' &&
      (params.value === null || params.value === '')
    );
  }

  function createPinnedCellPlaceholder({ colDef }: any) {
    const data = colDef.field[0].toUpperCase() + colDef.field.slice(1) + '...';
    return data;
  }

  const isPinnedRowDataCompleted = useCallback(
    (params: { rowPinned: string }) => {
      if (params.rowPinned !== 'top') return false;
      return columnDefs.every(
        (def: { field?: any }) => inputRow[def.field] !== undefined
      );
    },
    [columnDefs, inputRow]
  );

  const onCellEditingStopped = useCallback(
    async (params: any) => {
      if (isPinnedRowDataCompleted(params)) {
        setRowData((prevRowData) => [...prevRowData, inputRow]);
        const data = await createLevelMutation(inputRow);
        console.log(data);
        if (!data.status) {
          toast.success('Successfully Added Level!');
          setInputRow({});
          refetch();
        } else {
          toast.error('Something Wrong Happened!');
        }
      }
    },
    [inputRow, isPinnedRowDataCompleted, refetch]
  );

  const defaultColumnDef = {
    width: 150,
    flex: 1,
    sortable: true,
    filter: true,
    floatingFilter: true,
    resizable: true,
    editable: true,
    valueFormatter: (params: any) =>
      isEmptyPinnedCell(params)
        ? createPinnedCellPlaceholder(params)
        : params.value,
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        {isLoading ? (
          'Loading'
        ) : (
          <AgGridReact
            rowData={data.items}
            columnDefs={columnDefs}
            defaultColDef={defaultColumnDef}
            masterDetail={true}
            pinnedTopRowData={[inputRow]}
            detailCellRendererParams={detailCellRendererParams}
            onCellEditingStopped={onCellEditingStopped}
          ></AgGridReact>
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
