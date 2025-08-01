// // File: src/pages/ReportCheckup.jsx
// import React, { useEffect, useState } from "react";  // ✅ Fix 1: Import hooks
// import { AgGridReact } from "ag-grid-react";         // ✅ Fix 2: Import AG Grid
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// const ReportCheckup = () => {
//   const [rowData, setRowData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/health/report")
//       .then(res => res.json())
//       .then(data => setRowData(data.data));
//   }, []);

//   const columnDefs = rowData[0] ? Object.keys(rowData[0]).map(key => ({ field: key })) : [];

//   return (
//     <div className="ag-theme-alpine" style={{ height: 850, width: "100%" , overflow: "hidden"}}>
//       <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} />
//     </div>
//   );
// };

// export default ReportCheckup;


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from 'ag-grid-enterprise';
import { ClientSideRowModelModule } from 'ag-grid-community';
import { LicenseManager } from "ag-grid-enterprise";
import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise';
import "../styles/aggrid.scss";

LicenseManager.setLicenseKey(
  "Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-064524}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Finkraft}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{finkraft}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{finkraft}_need_to_be_licensed___{finkraft}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{5_August_2025}____[v3]_[0102]_MTc1NDM0ODQwMDAwMA==f6fa016c1d5a2cae512ac9e9a68e6239"
);

// Register AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);


const ReportCheckup = () => {
  const [tableData, setTableData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null); // Ref to the AG Grid instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/health/report");
        console.log("Invoice API response:", response.data);
        const responseData = response.data.data || [];
        setTableData(responseData);

        if (responseData.length > 0) {
          const dynamicCols = Object.keys(responseData[0]).map(key => ({
            headerName: key.replace(/_/g, ' ').toUpperCase(),
            field: key,
            sortable: true,
            filter: true,
          }));
          setColumnDefs(dynamicCols);
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="report-container">
      <div className="ag-theme-quartz grid-wrapper" style={{ height: "100vh", width: "100%" }}>
        {loading ? (
          <p>Loading Invoice Checkup data...</p>
        ) : (
          <AgGridReact
            ref={gridRef}
            rowData={tableData}
            columnDefs={columnDefs}
            modules={[ClientSideRowModelModule]}
            pagination={true}
            paginationPageSize={100}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
              suppressMovable: false,
            }}
            animateRows={true}
            rowSelection="multiple"
            enableRangeSelection={true}
          />
        )}
      </div>
    </div>  
  );
};

export default ReportCheckup;


// const PAGE_SIZE = 100;

// const ReportCheckup = () => {
//   const [columnDefs, setColumnDefs] = useState([]);
//   const [rowData, setRowData] = useState([]);
//   const [totalRows, setTotalRows] = useState(0);
//   const [currentPage, setCurrentPage] = useState(0); // Page index

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/api/health/");
//       const data = await response.json();
//       setRowData(data.data || []);
//       setTotalRows(data.total || 0);

//       // Dynamically set columnDefs only once
//       if (data.data?.length && columnDefs.length === 0) {
//         const cols = Object.keys(data.data[0]).map((key) => ({ field: key }));
//         setColumnDefs(cols);
//       }
//     } catch (error) {
//       console.error("Error fetching paginated data:", error);
//     }
//   }, [columnDefs.length]);

//   useEffect(() => {
//     fetchPageData(currentPage);
//   }, [fetchPageData, currentPage]);

//   const handleNext = () => {
//     if ((currentPage + 1) * PAGE_SIZE < totalRows) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 0) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       <div className="report-container">
//         <div className="ag-theme-quartz grid-wrapper" style={{ height: 850, width: "100%" }}>
//           <AgGridReact 
//               rowData={rowData} 
//               columnDefs={columnDefs} 
//               pagination={false} />
//         </div>
//         <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
//           <button onClick={handlePrev} disabled={currentPage === 0}>Previous</button>
//           <span>Page {currentPage + 1} of {Math.ceil(totalRows / PAGE_SIZE)}</span>
//           <button onClick={handleNext} disabled={(currentPage + 1) * PAGE_SIZE >= totalRows}>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportCheckup;


