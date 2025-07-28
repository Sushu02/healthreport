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
import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/header.scss";

const HeaderContainer = ({
  title,
  showDownloadButtons,
  selectedPortal,
  setSelectedPortal,
  portalOptions,
  handleDownloadCSV,
}) => {
  return (
    <div className="navbar">
      <div className="left">
        <h2>{title}</h2>
        {showDownloadButtons && (
          <>
            <select
              value={selectedPortal}
              onChange={(e) => setSelectedPortal(e.target.value)}
            >
              {portalOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button onClick={handleDownloadCSV}>Download CSV</button>
          </>
        )}
      </div>
      <div className="right">Mmt Admin</div>
    </div>
  );
};


export default HeaderContainer;
