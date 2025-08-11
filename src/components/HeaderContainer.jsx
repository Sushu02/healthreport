// // // src/components/HeaderContainer.jsx
// // import React from "react";
// // import "../styles/header.scss";

// // const HeaderContainer = ({ activeModule }) => {
// //   const defaultOptions = ["Option A", "Option B", "Option C"];

// //   return (
// //     <div className="header-container">
// //       <div className="header-title">{activeModule}</div>
// //       <select className="header-dropdown">
// //         {defaultOptions.map((opt, i) => (
// //           <option key={i} value={opt}>
// //             {opt}
// //           </option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // };

// // export default HeaderContainer;



// src/components/HeaderContainer.jsx
// components/Header.js
import React, { useEffect, useState } from "react";

const HeaderContainer = ({ selectedPortal, onPortalChange }) => {
  const [portals, setPortals] = useState([]);

  useEffect(() => {
    fetch("/api/portals")
      .then((res) => res.json())
      .then((data) => {
        if (data.portals) {
          setPortals(["All data", ...data.portals]);

          // Auto-select "All data" if nothing selected yet
          if (!selectedPortal) {
            onPortalChange("All data");
          }
        }
      })
      .catch((err) => console.error("Failed to fetch portals:", err));
  }, [onPortalChange, selectedPortal]); // proper dependencies

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        background: "#f5f5f5",
        borderBottom: "1px solid #ddd",
      }}
    >
      <select
        value={selectedPortal || "All data"}
        onChange={(e) => onPortalChange(e.target.value)}
        style={{
          padding: "5px 10px",
          fontSize: "14px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        {portals.length > 0 ? (
          portals.map((portal) => (
            <option key={portal} value={portal}>
              {portal}
            </option>
          ))
        ) : (
          <option disabled>No portals available</option>
        )}
      </select>

      <div style={{ marginLeft: "auto" }}>
        {/* Add other header content here */}
      </div>
    </header>
  );
};

export default HeaderContainer;
