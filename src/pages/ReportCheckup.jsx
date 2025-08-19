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


// const ReportCheckup = () => {
//   const [tableData, setTableData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const gridRef = useRef(null); // Ref to the AG Grid instance

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/health/report");
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

// export default ReportCheckup;


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


const ReportCheckup = () => {
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
      { headerName: "Report Date", field: "report_initialization_date_time" },
      { headerName: "Total Columns In UI", field: "totalColumnsInUI" },
      { headerName: "Total Rows In UI", field: "totalRowsInUI" },
      { headerName: "Total Rows In DB", field: "totalRowsInDB" },
      {
        headerName: "Backend Flag",
        field: "reportReceivedBackendFlag",
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
        field: "reportDownloadUIFlag",
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
        headerName: "Total Rows In Excel",
        field: "totalRowsInExcel",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("totalRowsInExcel"),
        valueFormatter: (params) => params.data?.totalRowsInExcel || '',
      },
      {
        headerName: "Total Columns In Excel",
        field: "totalColumnsInExcel",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("totalColumnsInExcel"),
        valueFormatter: (params) => params.data?.totalColumnsInExcel || '',
      },
      {
        headerName: "Row Difference",
        field: "rowDifference",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("rowDifference"),
        valueFormatter: (params) => params.data?.rowDifference || '',
      },
      {
        headerName: "Total Time",
        field: "totalTime",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("totalTime"),
        valueFormatter: (params) => params.data?.totalTime || '',
      },
      {
        headerName: "Test Status WrtTime",
        field: "testStatusWrtTime",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("testStatusWrtTime"),
        valueFormatter: (params) => params.data?.testStatusWrtTime || '',
      },
      {
        headerName: "Test Status WrtRow",
        field: "testStatusWrtRow",
        filter: 'agNumberColumnFilter',
        valueGetter: getNumericValue("testStatusWrtRow"),
        valueFormatter: (params) => params.data?.testStatusWrtRow || '',
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
          response = await axios.get("/api/health/report");
        } else {
          // POST with portal filter in body
          response = await axios.post("/api/health/report", {
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

export default ReportCheckup;
