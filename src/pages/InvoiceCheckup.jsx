// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { ModuleRegistry } from "ag-grid-community";
// import { ClientSideRowModelModule } from "ag-grid-community";

// ModuleRegistry.registerModules([ClientSideRowModelModule]);

// const InvoiceCheckup = () => {
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/health/invoice");
//         console.log("Invoice API response:", response.data);
//         const responseData = response.data.data || [];
//         setRowData(responseData);

//         if (responseData.length > 0) {
//           const dynamicCols = Object.keys(responseData[0]).map(key => ({
//             headerName: key.replace(/_/g, ' ').toUpperCase(),
//             field: key,
//             sortable: true,
//             filter: true,
//           }));
//           setColumnDefs(dynamicCols);
//         }
//       } catch (error) {
//         console.error("Error fetching invoice data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="ag-theme-alpine" style={{ height: "80vh", width: "100%" }}>
//       {loading ? (
//         <p>Loading Invoice Checkup data...</p>
//       ) : (
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={columnDefs}
//           modules={[ClientSideRowModelModule]}
//         />
//       )}
//     </div>
//   );
// };

// export default InvoiceCheckup;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-enterprise';
// import 'ag-grid-enterprise/styles/ag-grid.css';
// import 'ag-grid-enterprise/styles/ag-theme-quartz.css';
// import 'ag-grid-enterprise';
// import "../styles/aggrid.scss";

// ModuleRegistry.registerModules([
//   ClientSideRowModelModule
// ]);

// const InvoiceCheckup = () => {
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/health/invoice");
//         console.log("Invoice API response:", response.data);
//         const responseData = response.data.data || [];
//         setRowData(responseData);

//         if (responseData.length > 0) {
//           const dynamicCols = Object.keys(responseData[0]).map(key => ({
//             headerName: key.replace(/_/g, ' ').toUpperCase(),
//             field: key,
//             sortable: true,
//             filter: true,
//           }));
//           setColumnDefs(dynamicCols);
//         }
//       } catch (error) {
//         console.error("Error fetching invoice data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="ag-theme-quartz grid-wrapper" style={{ height: "100vh", width: "100%" }}>
//       {loading ? (
//         <p>Loading Invoice Checkup data...</p>
//       ) : (
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={columnDefs}
//           modules={[ClientSideRowModelModule]}
//           pagination={true}
//           paginationPageSize={100} // Show 100 rows per page
//           defaultColDef={{
//             sortable: true,
//             filter: true,
//             resizable: true,
//             suppressMovable: false,
//           }}
//           animateRows={true}
//           rowSelection="multiple"
//           enableRangeSelection={true}
//         />
//       )}
//     </div>
//   );
// };

// export default InvoiceCheckup;


// WORKING PERFECTLY

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import { ModuleRegistry } from 'ag-grid-enterprise';
// import { ClientSideRowModelModule } from 'ag-grid-community';
// import { LicenseManager } from "ag-grid-enterprise";
// import 'ag-grid-enterprise/styles/ag-grid.css';
// import 'ag-grid-enterprise/styles/ag-theme-quartz.css';
// import 'ag-grid-enterprise';
// import "../styles/aggrid.scss";

// LicenseManager.setLicenseKey(
//   "Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-064524}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Finkraft}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{finkraft}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{finkraft}_need_to_be_licensed___{finkraft}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{5_August_2025}____[v3]_[0102]_MTc1NDM0ODQwMDAwMA==f6fa016c1d5a2cae512ac9e9a68e6239"
// );

// // Register AG Grid modules
// ModuleRegistry.registerModules([ClientSideRowModelModule]);

// const InvoiceCheckup = () => {
//   const [tableData, setTableData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const gridRef = useRef(null); // Ref to the AG Grid instance

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/health/invoice");
//         console.log("Invoice API response:", response.data);
//         const responseData = response.data.data || [];
//         setTableData(responseData);

//         if (responseData.length > 0) {
//           const dynamicCols = Object.keys(responseData[0]).map(key => ({
//             headerName: key.replace(/_/g, ' ').toUpperCase(),
//             field: key,
//             sortable: true,
//             filter: true,
//           }));
//           setColumnDefs(dynamicCols);
//         }
//       } catch (error) {
//         console.error("Error fetching invoice data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="report-container">
//       <div className="ag-theme-quartz grid-wrapper" style={{ height: "100vh", width: "100%" }}>
//         {loading ? (
//           <p>Loading Invoice Checkup data...</p>
//         ) : (
//           <AgGridReact
//             ref={gridRef}
//             rowData={tableData}
//             columnDefs={columnDefs}
//             modules={[ClientSideRowModelModule]}
//             pagination={true}
//             paginationPageSize={100}
//             defaultColDef={{
//               sortable: true,
//               filter: true,
//               resizable: true,
//               suppressMovable: false,
//             }}
//             animateRows={true}
//             rowSelection="multiple"
//             enableRangeSelection={true}
//           />
//         )}
//       </div>
//     </div>  
//   );
// };

// export default InvoiceCheckup;




'use client';
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { LicenseManager } from "ag-grid-enterprise";
import {
  ModuleRegistry,
  ServerSideRowModelModule,
  RowGroupingModule,
  ExcelExportModule,
} from 'ag-grid-enterprise';

import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/ag-theme-quartz.css';
import "../styles/aggrid.scss";

LicenseManager.setLicenseKey(
    "Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-064524}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Finkraft}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{finkraft}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{finkraft}_need_to_be_licensed___{finkraft}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{5_August_2025}____[v3]_[0102]_MTc1NDM0ODQwMDAwMA==f6fa016c1d5a2cae512ac9e9a68e6239"
  );
  

// Register required modules
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  RowGroupingModule,
  ExcelExportModule,
]);

const InvoiceCheckup = () => {
  const gridRef = useRef(null);
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    // Define columns with grouping support
    const cols = [
      {
        headerName: "Make",
        field: "make",
        enableRowGroup: true,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Model",
        field: "model",
        enableRowGroup: true,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Price",
        field: "price",
        sortable: true,
        filter: "agNumberColumnFilter",
      },
    ];

    setColumnDefs(cols);
  }, []);

  // Row styling
  const getRowStyle = params => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "#f9f9f9" };
    }
    return null;
  };

  // Datasource for server-side model
  const datasource = {
    getRows: async (params) => {
      const { startRow, endRow, filterModel, sortModel } = params.request;
      try {
        const response = await axios.post("/api/health/invoice", {
          startRow,
          endRow,
          filterModel,
          sortModel,
        });
  
        params.successCallback(response.data.rows, response.data.lastRow);
      } catch (error) {
        console.error("Error loading rows:", error);
        // Remove or optionally replace with:
        params.successCallback([], 0); // ✅ fallback to no rows
      }
    },
  };
  
  const onGridReady = useCallback((params) => {
    gridRef.current.api.setServerSideDatasource(datasource);
  }, []);

  // Export functions
  // const exportToCsv = () => {
  //   gridRef.current.api.exportDataAsCsv();
  // };

  // const exportToExcel = () => {
  //   gridRef.current.api.exportDataAsExcel();
  // };

  const exportToCsv = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsCsv();
    }
  };
  
  const exportToExcel = () => {
    if (gridRef.current) {
      gridRef.current.api.exportDataAsExcel(); // Enterprise only
    }
  };
  

  return (
    <div className="report-container" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={exportToCsv} style={{ marginRight: 10 }}>Export CSV</button>
        <button onClick={exportToExcel}>Export Excel</button>
      </div>
      <div className="ag-theme-quartz" style={{ flex: 1 }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowModelType="serverSide"
          pagination={true}
          paginationPageSize={50}
          animateRows={true}
          defaultColDef={{
            flex: 1,
            minWidth: 120,
            resizable: true,
            sortable: true,
            filter: true,
            enableRowGroup: true,
          }}
          rowGroupPanelShow="always"
          enableRangeSelection={true}
          getRowStyle={getRowStyle}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default InvoiceCheckup;
