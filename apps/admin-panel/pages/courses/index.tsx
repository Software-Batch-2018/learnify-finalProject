import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useGetAllCourses } from '../../utils/queryfn/courses';
import { defaultColumnDef } from '../../utils/columndefs/blogs.columndef';

const GridExample = () => {
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
    </div>
  );
};
export default GridExample;
