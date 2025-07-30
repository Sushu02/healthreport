// Fetch Portal Name
// import React, { useState, useEffect } from "react";

// const Trends = () => {
//   const [data, setData] = useState([]);
//   const [portalNames, setPortalNames] = useState([]);

//   useEffect(() => {
//     const apiUrl = "http://localhost:8000/weekly-trends";

//     fetch(apiUrl)
//       .then(response => {
//         if (!response.ok) throw new Error("Network response was not OK");
//         return response.json();
//       })
//       .then(apiData => {
//         let records = Array.isArray(apiData) ? apiData : apiData.data || [];
//         const processedData = records.map(d => ({
//           ...d,
//           perInvoiceDownloadTimeMin: Number(d.perInvoiceDownloadTimeBasedOnDB) / 60,
//         }));
        
//         setData(processedData);

//         // Extract distinct portal names here
//         const portals = [...new Set(processedData.map(d => d.portalName))];
//         setPortalNames(portals);

//         console.log("Portal Names from API:", portals);
//       })
//       .catch(error => {
//         console.error("Failed to fetch data from API:", error);
//         setData([]);
//         setPortalNames([]);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Portal Names:</h2>
//       <ul>
//         {portalNames.map((portal) => (
//           <li key={portal}>{portal}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Trends;




import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

const Trends = () => {
  const [data, setData] = useState([]);
  const [hoveredPortal, setHoveredPortal] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:8000/weekly-trends";

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error("Network response was not OK");
        return response.json();
      })
      .then(apiData => {
        console.log("Raw API data:", apiData);

        let records = Array.isArray(apiData) ? apiData : apiData.data || [];
        const processedData = records.map(d => ({
          ...d,
          perInvoiceDownloadTimeMin:
            Array.isArray(d.perInvoiceDownloadTimeBasedOnDB) && d.perInvoiceDownloadTimeBasedOnDB.length > 0
              ? Number(d.perInvoiceDownloadTimeBasedOnDB[0]) / 60
              : 0,
          InvoiceStatus:
            Array.isArray(d.InvoiceStatus) && d.InvoiceStatus.length > 0
              ? d.InvoiceStatus[0]
              : d.InvoiceStatus || "N/A",
        }));

        console.log("Processed chart data:", processedData);
        setData(processedData);
      })
      .catch(error => {
        console.error("Failed to fetch data from API:", error);
        setData([]);
      });
  }, []);

  const portals = [...new Set(data.map(d => d.portalName))];
  console.log("Distinct portals:", portals);

  const portalColors = {
    ClearTrip: "#5B8FF9",
    Balmer: "#5AD8A6",
    Yatra: "#5D7092",
    MakeMyTrip: "#F6BD16",
    PickYourTrail: "#E8684A",
    FCM: "#6DC8EC",
    BCD: "#9270CA",
    ATPI: "#FF9D4D"
  };

  const series = portals.map(portal => {
    const isActive = hoveredPortal === null || hoveredPortal === portal;
    const filteredData = data.filter(d => d.portalName === portal);
    console.log(`Data series for portal ${portal}:`, filteredData);

    return {
      type: "bar",
      xKey: "date",
      yKey: "perInvoiceDownloadTimeMin",
      yName: portal,
      grouped: true,
      data: filteredData,
      fill: portalColors[portal] || undefined,
      tooltip: {
        renderer: ({ datum }) => ({
          title: `Portal: ${datum.portalName}`,
          data: [
            { label: "Date", value: datum.date },
            { label: "Invoice Status", value: datum.InvoiceStatus },
            { label: "Download Time (min)", value: datum.perInvoiceDownloadTimeMin.toFixed(2) },
          ],
        }),
      },
    };
  });

  console.log("Chart series array:", series);

  const options = {
    title: { text: "Invoice Download Time grouped by Date and Portal (API Data)" },
    subtitle: { text: "Time in Minutes" },
    data,
    series,
    axes: [
      { type: "category", position: "bottom", title: { text: "Date" } },
      { type: "number", position: "left", title: { text: "Download Time (minutes)" } },
    ],
    legend: { position: "bottom" },
  };

  console.log("Final chart options:", options);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <AgCharts options={options} onChartReady={chart => {
        // You can also log the chart instance if needed
        console.log("AG Chart instance:", chart);
        // Add hover event handlers as needed here
      }} />
    </div>

  );
};

export default Trends;
