// import React, { useState, useEffect } from "react";
// import { AgCharts } from "ag-charts-react";

// const Trends = () => {
//   const [data, setData] = useState([]);
//   const [timeOfDay, setTimeOfDay] = useState("Morning"); // toggle state

//   // function to fetch API with POST
//   const fetchTrends = async (time) => {
//     try {
//       const apiUrl = "http://localhost:8000/weekly-trends";
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ run_type: time })
//       });

//       if (!response.ok) throw new Error("Network response was not OK");
//       const apiData = await response.json();

//       let records = Array.isArray(apiData) ? apiData : apiData.data || [];
//       const processedData = records.map(d => ({
//         ...d,
//         perInvoiceDownloadTimeMin:
//           Array.isArray(d.perInvoiceDownloadTimeBasedOnDB) && d.perInvoiceDownloadTimeBasedOnDB.length > 0
//             ? Number(d.perInvoiceDownloadTimeBasedOnDB[0]) / 60
//             : 0,
//         InvoiceStatus:
//           Array.isArray(d.InvoiceStatus) && d.InvoiceStatus.length > 0
//             ? d.InvoiceStatus[0]
//             : d.InvoiceStatus || "N/A",
//       }));

//       setData(processedData);
//     } catch (error) {
//       console.error("Failed to fetch data from API:", error);
//       setData([]);
//     }
//   };

//   // refetch data whenever toggle changes
//   useEffect(() => {
//     fetchTrends(timeOfDay);
//   }, [timeOfDay]);

//   const portals = [...new Set(data.map(d => d.portalName))];

//   const portalColors = {
//     ClearTrip: "#5B8FF9",
//     Balmer: "#5AD8A6",
//     Yatra: "#5D7092",
//     MakeMyTrip: "#F6BD16",
//     PickYourTrail: "#E8684A",
//     FCM: "#6DC8EC",
//     BCD: "#9270CA",
//     ATPI: "#FF9D4D"
//   };

//   const series = portals.map(portal => {
//     const filteredPortalData = data.filter(d => d.portalName === portal);
//     return {
//       type: "bar",
//       xKey: "date",
//       yKey: "perInvoiceDownloadTimeMin",
//       yName: portal,
//       grouped: true,
//       data: filteredPortalData,
//       fill: portalColors[portal] || undefined,
//       tooltip: {
//         renderer: ({ datum }) => ({
//           title: `Portal: ${datum.portalName}`,
//           data: [
//             { label: "Date", value: datum.date },
//             { label: "Invoice Status", value: datum.InvoiceStatus },
//             { label: "Download Time (min)", value: datum.perInvoiceDownloadTimeMin.toFixed(2) },
//           ],
//         }),
//       },
//     };
//   });

//   const options = {
//     title: { text: `Invoice Download Time (${timeOfDay})` },
//     subtitle: { text: "Time in Minutes" },
//     data,
//     series,
//     axes: [
//       { type: "category", position: "bottom", title: { text: "Date" } },
//       { type: "number", position: "left", title: { text: "Download Time (minutes)" } },
//     ],
//     legend: { position: "bottom" },
//   };

//   return (
//     <div style={{ height: 650, width: "100%" }}>
//       {/* Toggle Switch */}
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
//           <span style={{ marginRight: "10px" }}>Morning</span>
//           <div
//             onClick={() => setTimeOfDay(timeOfDay === "Morning" ? "Afternoon" : "Morning")}
//             style={{
//               width: "50px",
//               height: "25px",
//               borderRadius: "25px",
//               background: timeOfDay === "Morning" ? "#5B8FF9" : "#F6BD16",
//               position: "relative",
//               transition: "0.3s"
//             }}
//           >
//             <div
//               style={{
//                 width: "20px",
//                 height: "20px",
//                 borderRadius: "50%",
//                 background: "white",
//                 position: "absolute",
//                 top: "2.5px",
//                 left: timeOfDay === "Morning" ? "3px" : "27px",
//                 transition: "0.3s"
//               }}
//             />
//           </div>
//           <span style={{ marginLeft: "10px" }}>Afternoon</span>
//         </label>
//       </div>

//       <AgCharts options={options} />
//     </div>
//   );
// };

// export default Trends;



// import React, { useState, useEffect } from "react";
// import { AgCharts } from "ag-charts-react";
// import "../styles/Trends.scss"; // import styles

// const Trends = () => {
//   const [data, setData] = useState([]);
//   const [timeOfDay, setTimeOfDay] = useState("Morning"); // toggle state

//   // function to fetch API with POST
//   const fetchTrends = async (time) => {
//     try {
//       const apiUrl = "http://localhost:8000/weekly-trends";
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ run_type: time })
//       });

//       if (!response.ok) throw new Error("Network response was not OK");
//       const apiData = await response.json();

//       let records = Array.isArray(apiData) ? apiData : apiData.data || [];
//       const processedData = records.map(d => ({
//         ...d,
//         perInvoiceDownloadTimeMin:
//           Array.isArray(d.perInvoiceDownloadTimeBasedOnDB) && d.perInvoiceDownloadTimeBasedOnDB.length > 0
//             ? Number(d.perInvoiceDownloadTimeBasedOnDB[0]) / 60
//             : 0,
//         InvoiceStatus:
//           Array.isArray(d.InvoiceStatus) && d.InvoiceStatus.length > 0
//             ? d.InvoiceStatus[0]
//             : d.InvoiceStatus || "N/A",
//       }));

//       setData(processedData);
//     } catch (error) {
//       console.error("Failed to fetch data from API:", error);
//       setData([]);
//     }
//   };

//   // refetch data whenever toggle changes
//   useEffect(() => {
//     fetchTrends(timeOfDay);
//   }, [timeOfDay]);

//   const portals = [...new Set(data.map(d => d.portalName))];

//   const portalColors = {
//     ClearTrip: "#5B8FF9",
//     Balmer: "#5AD8A6",
//     Yatra: "#5D7092",
//     MakeMyTrip: "#F6BD16",
//     PickYourTrail: "#E8684A",
//     FCM: "#6DC8EC",
//     BCD: "#9270CA",
//     ATPI: "#FF9D4D"
//   };

//   const series = portals.map(portal => {
//     const filteredPortalData = data.filter(d => d.portalName === portal);
//     return {
//       type: "bar",
//       xKey: "date",
//       yKey: "perInvoiceDownloadTimeMin",
//       yName: portal,
//       grouped: true,
//       data: filteredPortalData,
//       fill: portalColors[portal] || undefined,
//       tooltip: {
//         renderer: ({ datum }) => ({
//           title: `Portal: ${datum.portalName}`,
//           data: [
//             { label: "Date", value: datum.date },
//             { label: "Invoice Status", value: datum.InvoiceStatus },
//             { label: "Download Time (min)", value: datum.perInvoiceDownloadTimeMin.toFixed(2) },
//           ],
//         }),
//       },
//     };
//   });

//   const options = {
//     title: { text: `Invoice Download Time (${timeOfDay})` },
//     subtitle: { text: "Time in Minutes" },
//     data,
//     series,
//     axes: [
//       { type: "category", position: "bottom", title: { text: "Date" } },
//       { type: "number", position: "left", title: { text: "Download Time (minutes)" } },
//     ],
//     legend: { position: "bottom" },
//   };

//   return (
//     <div className="trends-graph">
//       {/* Toggle aligned left */}
//       <div className="toggle-container">
//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={timeOfDay === "Afternoon"}
//             onChange={() =>
//               setTimeOfDay(timeOfDay === "Morning" ? "Afternoon" : "Morning")
//             }
//           />
//           <span className="slider round"></span>
//         </label>
//         <span className="toggle-label">
//           {timeOfDay === "Morning" ? "Morning" : "Afternoon"}
//         </span>
//       </div>

//       {/* Graph */}
//       <h3 className="text-lg font-semibold mb-4">Invoice Download Time</h3>
//       <div className="bg-white shadow-md p-6 rounded-xl">
//         <AgCharts options={options} />
//       </div>
//     </div>
//   );
// };

// export default Trends;



// import React, { useState, useEffect } from "react";
// import { AgCharts } from "ag-charts-react";
// import "../styles/Trends.scss";

// const Trends = () => {
//   const [data, setData] = useState([]);
//   const [timeOfDay, setTimeOfDay] = useState("Morning"); // toggle state

//   // function to fetch API with POST
//   const fetchTrends = async (time) => {
//     try {
//       const apiUrl = "http://localhost:8000/weekly-trends";
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ run_type: time }),
//       });

//       if (!response.ok) throw new Error("Network response was not OK");
//       const apiData = await response.json();

//       let records = Array.isArray(apiData) ? apiData : apiData.data || [];

//       // Transform API response → { date, pass, fail }
//       const dates = [...new Set(records.map((d) => d.date))].sort();
//       const processedData = dates.map((date) => {
//         const forDate = records.filter((d) => d.date === date);
//         const pass = forDate.filter((d) => d.InvoiceStatus === "pass").length;
//         const fail = forDate.filter((d) => d.InvoiceStatus === "fail").length;
//         return { date, pass, fail };
//       });

//       setData(processedData);
//     } catch (error) {
//       console.error("Failed to fetch data from API:", error);
//       setData([]);
//     }
//   };

//   // refetch whenever toggle changes
//   useEffect(() => {
//     fetchTrends(timeOfDay);
//   }, [timeOfDay]);

//   const options = {
//     title: { text: `Invoice Status Count (${timeOfDay})` },
//     subtitle: { text: "Pass vs. Fail portals per day" },
//     data,
//     series: [
//       {
//         type: "line",
//         xKey: "date",
//         yKey: "pass",
//         yName: "Pass",
//         stroke: "#007bff",
//         marker: { enabled: true, shape: "circle", fill: "#007bff" },
//         interpolation: { type: "smooth" },
//       },
//       {
//         type: "line",
//         xKey: "date",
//         yKey: "fail",
//         yName: "Fail",
//         stroke: "#f85c3a",
//         marker: { enabled: true, shape: "circle", fill: "#f85c3a" },
//         interpolation: { type: "smooth" },
//       },
//     ],
//     axes: [
//       { type: "category", position: "bottom", title: { text: "Date" } },
//       {
//         type: "number",
//         position: "left",
//         title: { text: "Portal Count" },
//         min: 0,
//         nice: true,
//         tick: { interval: 1 },
//       },
//     ],
//     legend: { position: "bottom" },
//   };

//   return (
//     <div className="trends-graph">
//       {/* Toggle aligned left */}
//       <div className="toggle-container">
//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={timeOfDay === "Afternoon"}
//             onChange={() =>
//               setTimeOfDay(timeOfDay === "Morning" ? "Afternoon" : "Morning")
//             }
//           />
//           <span className="slider round"></span>
//         </label>
//         <span className="toggle-label">
//           {timeOfDay === "Morning" ? "🌅 Morning" : "🌞 Afternoon"}
//         </span>
//       </div>

//       {/* Graph */}
//       <h3 className="text-lg font-semibold mb-4">
//         Invoice Status Count (Line Graph)
//       </h3>
//       <div className="bg-white shadow-md p-6 rounded-xl">
//         <AgCharts options={options} />
//       </div>
//     </div>
//   );
// };

// export default Trends;



import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import "../styles/Trends.scss";

const Trends = () => {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState("Morning");

  const fetchTrends = async (time) => {
    try {
      const apiUrl = "http://localhost:8000/weekly-trends";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ run_type: time }),
      });

      if (!response.ok) throw new Error("Network response was not OK");
      const apiData = await response.json();

      const records = Array.isArray(apiData) ? apiData : apiData.data || [];
      setRawData(records);

      const dates = [...new Set(records.map((d) => d.date))].sort();

      const processedData = dates.map((date) => {
        const forDate = records.filter((d) => d.date === date);

        let pass = 0;
        let fail = 0;

        forDate.forEach((d) => {
          const statusArray = d.TestStausAsPerInvTime || [];
          if (statusArray.length === 0) return;
          const status = statusArray[0].toUpperCase();
          if (status === "PASS") pass++;
          else if (status === "FAIL") fail++;
        });

        return { date, pass, fail };
      });

      setData(processedData);
    } catch (error) {
      console.error("Failed to fetch data from API:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchTrends(timeOfDay);
  }, [timeOfDay]);

  const tooltipRenderer = (datum, status) => {
    const portals = rawData.filter(
      (d) => d.date === datum.date && d.TestStausAsPerInvTime[0]?.toUpperCase() === status
    );

    if (!portals.length) return { title: datum.date, content: "No portals" };

    const htmlContent = portals
      .map(
        (p) =>
          `<div>Portal: <b>${p.portalName}</b>, Run: ${p.run_type}, Date: ${p.date}, Status: ${p.TestStausAsPerInvTime[0]}</div>`
      )
      .join("");

    return { title: `Date: ${datum.date}`, content: htmlContent };
  };

  const options = {
    title: { text: `Invoice Status Count (${timeOfDay})` },
    subtitle: { text: "Pass vs Fail portals per day" },
    data,
    series: [
      {
        type: "line",
        xKey: "date",
        yKey: "pass",
        yName: "Pass",
        stroke: "#007bff",
        marker: { enabled: true, shape: "circle", fill: "#007bff" },
        interpolation: { type: "smooth" },
        tooltip: { renderer: ({ datum }) => tooltipRenderer(datum, "PASS") },
      },
      {
        type: "line",
        xKey: "date",
        yKey: "fail",
        yName: "Fail",
        stroke: "#f85c3a",
        marker: { enabled: true, shape: "circle", fill: "#f85c3a" },
        interpolation: { type: "smooth" },
        tooltip: { renderer: ({ datum }) => tooltipRenderer(datum, "FAIL") },
      },
    ],
    axes: [
      { type: "category", position: "bottom", title: { text: "Date" } },
      {
        type: "number",
        position: "left",
        title: { text: "Portal Count" },
        min: 0,
        max: 8,
        nice: false,
        tick: { interval: 1 },
      },
    ],
    legend: { position: "bottom" },
  };

  return (
    <div className="trends-graph">
      <div className="toggle-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={timeOfDay === "Afternoon"}
            onChange={() =>
              setTimeOfDay(timeOfDay === "Morning" ? "Afternoon" : "Morning")
            }
          />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">
          {timeOfDay === "Morning" ? "🌅 Morning" : "🌞 Afternoon"}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-4">
        Invoice Status Count (Line Graph)
      </h3>
      <div className="bg-white shadow-md p-6 rounded-xl">
        <AgCharts options={options} />
      </div>
    </div>
  );
};

export default Trends;
