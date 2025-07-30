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


import React, { useState, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-enterprise/styles/ag-grid.css';
import 'ag-grid-enterprise/styles/ag-theme-quartz.css';
import 'ag-grid-enterprise';


const PAGE_SIZE = 100;

const ReportCheckup = () => {
  const [columnDefs, setColumnDefs] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Page index

  const fetchPageData = useCallback(async (page) => {
    try {
      const offset = page * PAGE_SIZE;
      const response = await fetch(`http://localhost:8000/api/health/report?limit=${PAGE_SIZE}&offset=${offset}`);
      const data = await response.json();
      setRowData(data.data || []);
      setTotalRows(data.total || 0);

      // Dynamically set columnDefs only once
      if (data.data?.length && columnDefs.length === 0) {
        const cols = Object.keys(data.data[0]).map((key) => ({ field: key }));
        setColumnDefs(cols);
      }
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    }
  }, [columnDefs.length]);

  useEffect(() => {
    fetchPageData(currentPage);
  }, [fetchPageData, currentPage]);

  const handleNext = () => {
    if ((currentPage + 1) * PAGE_SIZE < totalRows) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="ag-theme-alpine" style={{ height: 850, width: "100%" }}>
        <AgGridReact 
            rowData={rowData} 
            columnDefs={columnDefs} 
            pagination={false} />
      </div>
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={handlePrev} disabled={currentPage === 0}>Previous</button>
        <span>Page {currentPage + 1} of {Math.ceil(totalRows / PAGE_SIZE)}</span>
        <button onClick={handleNext} disabled={(currentPage + 1) * PAGE_SIZE >= totalRows}>Next</button>
      </div>
    </div>
  );
};

export default ReportCheckup;


