import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useGetAllCourses } from '../../utils/queryfn/courses';
import { defaultColumnDef } from '../../utils/columndefs/blogs.columndef';
import { Modal } from '../../components/modal';
import { QuizBuilder } from '../../components/quiz/quiz';

const GridExample = () => {
  const [quizModal, setQuizModal] = React.useState(false);
  const [contentDetail, setContentDetail] = React.useState({
    course_id: '',
    course_name: '',
  });
  const { data, isLoading } = useGetAllCourses();
  const containerStyle = useMemo(() => ({ width: '100%', height: '80vh' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState([
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
                cellRenderer: (param: any) => {
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
                cellRenderer: (param: any) => {
                  return (
                    <div className="flex gap-2 justify-center items-center mt-2">
                      <button
                        onClick={() => {
                          console.log(param.data);
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
            params.successCallback(params.data.contents);
          },
        },
      },
      getDetailRowData: (params: any) => {
        params.successCallback(params.data.subjects);
      },
    };
  }, []);

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
            detailCellRendererParams={detailCellRendererParams}
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
export default GridExample;
