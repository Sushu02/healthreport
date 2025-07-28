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


import React, { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import '../styles/aggrid.scss';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const InvoiceCheckup = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/health/invoice?limit=${PAGE_SIZE}&offset=${offset}");
        console.log("Invoice API response:", response.data);
        const responseData = response.data.data || [];
        setRowData(responseData);

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
    <div className="ag-theme-alpine" style={{ height: "100vh", width: "100%" }}>
      {loading ? (
        <p>Loading Invoice Checkup data...</p>
      ) : (
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          modules={[ClientSideRowModelModule]}
          pagination={true}
          paginationPageSize={100} // Show 100 rows per page
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
  );
};

export default InvoiceCheckup;


