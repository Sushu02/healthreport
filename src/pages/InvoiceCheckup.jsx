'use client';
import React, { useEffect, useState, useRef } from "react";
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
import HeaderContainer from "../components/HeaderContainer";

LicenseManager.setLicenseKey(
    "Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-064524}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Finkraft}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{finkraft}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{finkraft}_need_to_be_licensed___{finkraft}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{5_August_2025}____[v3]_[0102]_MTc1NDM0ODQwMDAwMA==f6fa016c1d5a2cae512ac9e9a68e6239"
  );
  

// Register required modules
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  RowGroupingModule,
  ExcelExportModule,
]);

// const InvoiceCheckup = () => {
//   const gridRef = useRef(null);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [rowData, setRowData] = useState([]);

//   useEffect(() => {
//     const getNumericValue = (fieldName) => (params) => {
//       const match = String(params.data[fieldName] || '').match(/\d+/);
//       return match ? parseInt(match[0], 10) : null;
//     };
  
//     const cols = [
//       { headerName: "Workspace", field: "workspaceName" },
//       { headerName: "Portal", field: "portalName" },
//       { headerName: "Invoice Date", field: "invoice_initialization_date_time" },
//       { headerName: "Test Status Count", field: "TestStausAsPerInvCount" },
//       { headerName: "Test Status Time", field: "TestStausAsPerInvTime" },
//       { headerName: "File Diff", field: "fileDifference" },
//       {
//         headerName: "Backend Flag",
//         field: "invoiceReceivedBackendFlag",
//         cellRenderer: (params) => {
//           const value = params.value;
//           if (value === true) {
//             return (
//               <div className="checkbox-green">
//                 <input
//                   type="checkbox"
//                   disabled
//                   checked
//                   style={{ cursor: 'default' }}
//                 />
//               </div>
//             );
//           } else if (value === false) {
//             return (
//               <input
//                 type="checkbox"
//                 disabled
//                 style={{ cursor: 'default' }}
//               />
//             );
//           } else if (value === '' || value === null || value === undefined || value === '--') {
//             return <span>--</span>;
//           } else {
//             return <span>{String(value)}</span>; // fallback
//           }
//         }
//       },
//       {
//         headerName: "UI Flag",
//         field: "invoiceDownloadUIFlag",
//         cellRenderer: (params) => {
//           const value = params.value;
//           if (value === true) {
//             return (
//               <div className="checkbox-green">
//                 <input
//                   type="checkbox"
//                   disabled
//                   checked
//                   style={{ cursor: 'default' }}
//                 />
//               </div>
//             );
//           } else if (value === false) {
//             return (
//               <input
//                 type="checkbox"
//                 disabled
//                 style={{ cursor: 'default' }}
//               />
//             );
//           } else if (value === '' || value === null || value === undefined || value === '--') {
//             return <span>--</span>;
//           } else {
//             return <span>{String(value)}</span>;
//           }
//         }
//       },        
  
//       {
//         headerName: "Per Download Time DB",
//         field: "perInvoiceDownloadTimeBasedOnDB",
//         filter: 'agNumberColumnFilter',
//         valueGetter: getNumericValue("perInvoiceDownloadTimeBasedOnDB"),
//         valueFormatter: (params) => params.data?.perInvoiceDownloadTimeBasedOnDB || '',
//       },
//       {
//         headerName: "Per Download Time ZIP",
//         field: "perInvoiceDownloadTimeBasedOnZip",
//         filter: 'agNumberColumnFilter',
//         valueGetter: getNumericValue("perInvoiceDownloadTimeBasedOnZip"),
//         valueFormatter: (params) => params.data?.perInvoiceDownloadTimeBasedOnZip || '',
//       },
//       {
//         headerName: "Files in DB",
//         field: "totalFilesInDB",
//         filter: 'agNumberColumnFilter',
//         valueGetter: getNumericValue("totalFilesInDB"),
//         valueFormatter: (params) => params.data?.totalFilesInDB || '',
//       },
//       {
//         headerName: "Files in UI",
//         field: "totalFilesInUI",
//         filter: 'agNumberColumnFilter',
//         valueGetter: getNumericValue("totalFilesInUI"),
//         valueFormatter: (params) => params.data?.totalFilesInUI || '',
//       },
//       {
//         headerName: "Files in ZIP",
//         field: "totalFilesInZip",
//         filter: 'agNumberColumnFilter',
//         valueGetter: getNumericValue("totalFilesInZip"),
//         valueFormatter: (params) => params.data?.totalFilesInZip || '',
//       },
  
//       { headerName: "Remark", field: "remark" },
//     ];
  
//     setColumnDefs(cols);
//   }, []);  

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/api/health/invoice");
//       console.log("API Response:", response.data); // ✅ check the shape
//       setRowData(response.data.data || []); // ✅ fix here
//     } catch (error) {
//       console.error("Failed to load row data", error);
//       setRowData([]);
//     }
//   };
//   fetchData();
// }, []);


//   const getRowStyle = (params) => {
//     return params.node.rowIndex % 2 === 0 ? { background: "#f9f9f9" } : null;
//   };


//   return (
//     <div className="report-container" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
    
//       <div style={{ marginBottom: 10 }}>
//       </div>
//       <div className="ag-theme-quartz" style={{ flex: 1 }}>
//       <AgGridReact
//         ref={gridRef}
//         columnDefs={columnDefs}
//         rowData={rowData}
//         animateRows={true}
//         defaultColDef={{
//           flex: 1,
//           minWidth: 120,
//           resizable: true,
//           sortable: true,
//           filter: true,
//           enableRowGroup: true,
//         }}
//         rowGroupPanelShow="always"
//         enableRangeSelection={true}
//         getRowStyle={getRowStyle}
//         sideBar={{
//           toolPanels: [
//             {
//               id: 'columns',
//               labelDefault: 'Columns',
//               labelKey: 'columns',
//               iconKey: 'columns',
//               toolPanel: 'agColumnsToolPanel',
//             },
//             {
//               id: 'filters',
//               labelDefault: 'Filters',
//               labelKey: 'filters',
//               iconKey: 'filter',
//               toolPanel: 'agFiltersToolPanel',
//             },
//           ],
//           defaultToolPanel: '' // 👈 ensures it's not open by default
//         }}        
//       />

//       </div>
//     </div>
//   );
// };


// export default InvoiceCheckup;




const InvoiceCheckup = () => {
  const gridRef = useRef(null);
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);

  // NEW: selected portal state
  const [selectedPortal, setSelectedPortal] = useState("All data");

  // NEW: handler to update selected portal
  const onPortalChange = (portal) => {
    setSelectedPortal(portal);
  };
  
    useEffect(() => {
    const getNumericValue = (fieldName) => (params) => {
      const match = String(params.data[fieldName] || '').match(/\d+/);
      return match ? parseInt(match[0], 10) : null;
    };
  
    const cols = [
      { headerName: "Workspace", field: "workspaceName" },
      { headerName: "Portal", field: "portalName" },
      { headerName: "Invoice Date", field: "invoice_initialization_date_time" },
      { headerName: "Test Status Count", field: "TestStausAsPerInvCount" },
      { headerName: "Test Status Time", field: "TestStausAsPerInvTime" },
      { headerName: "File Diff", field: "fileDifference" },
      {
        headerName: "Backend Flag",
        field: "invoiceReceivedBackendFlag",
        cellRenderer: (params) => {
          const value = params.value;
          if (value === true) {
            return (
              <div className="checkbox-green">
                <input
                  type="checkbox"
                  disabled
                  checked
                  style={{ cursor: 'default' }}
                />
              </div>
            );
          } else if (value === false) {
            return (
              <input
                type="checkbox"
                disabled
                style={{ cursor: 'default' }}
              />
            );
          } else if (value === '' || value === null || value === undefined || value === '--') {
            return <span>--</span>;
          } else {
            return <span>{String(value)}</span>; // fallback
          }
        }
      },
      {
        headerName: "UI Flag",
        field: "invoiceDownloadUIFlag",
        cellRenderer: (params) => {
          const value = params.value;
          if (value === true) {
            return (
              <div className="checkbox-green">
                <input
                  type="checkbox"
                  disabled
                  checked
                  style={{ cursor: 'default' }}
                />
              </div>
            );
          } else if (value === false) {
            return (
              <input
                type="checkbox"
                disabled
                style={{ cursor: 'default' }}
              />
            );
          } else if (value === '' || value === null || value === undefined || value === '--') {
            return <span>--</span>;
          } else {
            return <span>{String(value)}</span>;
          }
        }
      },        
  
      {
        headerName: "Per Download Time DB",
        field: "perInvoiceDownloadTimeBasedOnDB",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("perInvoiceDownloadTimeBasedOnDB"),
        valueFormatter: (params) => params.data?.perInvoiceDownloadTimeBasedOnDB || '',
      },
      {
        headerName: "Per Download Time ZIP",
        field: "perInvoiceDownloadTimeBasedOnZip",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("perInvoiceDownloadTimeBasedOnZip"),
        valueFormatter: (params) => params.data?.perInvoiceDownloadTimeBasedOnZip || '',
      },
      {
        headerName: "Files in DB",
        field: "totalFilesInDB",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("totalFilesInDB"),
        valueFormatter: (params) => params.data?.totalFilesInDB || '',
      },
      {
        headerName: "Files in UI",
        field: "totalFilesInUI",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("totalFilesInUI"),
        valueFormatter: (params) => params.data?.totalFilesInUI || '',
      },
      {
        headerName: "Files in ZIP",
        field: "totalFilesInZip",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("totalFilesInZip"),
        valueFormatter: (params) => params.data?.totalFilesInZip || '',
      },
  
      { headerName: "Remark", field: "remark" },
    ];
  
    setColumnDefs(cols);
  }, []);  

  // NEW: Fetch invoice data whenever selectedPortal changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
  
        if (selectedPortal === "All data") {
          // GET without portal filter
          response = await axios.get("/api/health/invoice");
        } else {
          // POST with portal filter in body
          response = await axios.post("/api/health/invoice", {
            portal: selectedPortal,
          });
        }
  
        setRowData(response.data.data || []);
        console.log("API Response:", response.data); // ✅ check the shape
      } catch (error) {
        console.error("Failed to load row data", error);
        setRowData([]);
      }
    };
  
    fetchData();
  }, [selectedPortal]);  
  

  const getRowStyle = (params) => {
    return params.node.rowIndex % 2 === 0 ? { background: "#f9f9f9" } : null;
  };

  return (
    <div
      className="report-container"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Include HeaderContainer and pass state + handler */}
      <HeaderContainer
        selectedPortal={selectedPortal}
        onPortalChange={onPortalChange}
      />

      <div style={{ marginBottom: 10 }}>{/* Optionally some filters/buttons here */}</div>

      <div className="ag-theme-quartz" style={{ flex: 1 }}>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={rowData}
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
          sideBar={{
            toolPanels: [
              {
                id: "columns",
                labelDefault: "Columns",
                labelKey: "columns",
                iconKey: "columns",
                toolPanel: "agColumnsToolPanel",
              },
              {
                id: "filters",
                labelDefault: "Filters",
                labelKey: "filters",
                iconKey: "filter",
                toolPanel: "agFiltersToolPanel",
              },
            ],
            defaultToolPanel: "", // don't open by default
          }}
        />
      </div>
    </div>
  );
};

export default InvoiceCheckup;
