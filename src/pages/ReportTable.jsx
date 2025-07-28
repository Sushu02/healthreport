import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise';

const ReportTable = ({ tableData, columnDefs, gridRef }) => {
  return (
    <div className="ag-theme-quartz" style={{ height: '80vh', width: '100%' }}>
      <AgGridReact
        ref={gridRef}
        rowData={tableData}
        columnDefs={columnDefs}
        pagination={true}
        defaultColDef={{
          filter: true,
          resizable: true,
          sortable: true,
          flex: 1,
        }}
      />
    </div>
  );
};

export default ReportTable;
