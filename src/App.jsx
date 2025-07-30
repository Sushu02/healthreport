// // src/App.jsx
// import React from "react";
// import Navbar from "./components/Navbar";
// import "./styles/global.scss";

// const App = () => {
//   return (
//     <div className="AppLayout">
//       <Navbar />
//       <div className="MainContent">
//         <div className="PageHeader">Header</div>
//         <div className="PageContent">
//           <h2>Welcome to Health Report Dashboard</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



// src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// // import InvoiceHealth from "./pages/InvoiceHealth";
// // import "./styles/app.scss";

// const App = () => {
//   return (
//     <Router>
//       <div className="AppLayout">
//         <Navbar />
//         <div className="MainContent">
//           <div className="PageHeader">Header</div>
//           <div className="PageContent">
//             <Routes>
//               {/* <Route path="/invoice" element={<InvoiceHealth reportType="Invoice Downloading Report" />} /> */}
//               <Route path="/" element={<div className="PageContent">Welcome to Health Report Dashboard</div>} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;



// // src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeaderContainer from "./components/HeaderContainer";
import Dashboard from "./pages/Dashboard";
import InvoiceCheckup from "./pages/InvoiceCheckup";
import ReportCheckup from "./pages/ReportCheckup";
import Credentials from "./pages/Credentials";
import Trends from "./pages/Trends"; // Adjust the path if it's inside `components`
import "../src/App.scss";

const App = () => {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <HeaderContainer />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice-checkup" element={<InvoiceCheckup />} />
            <Route path="/report-checkup" element={<ReportCheckup />} />
            <Route path="/credentials" element={<Credentials/>}/>
            <Route path="/trends" element={<Trends />} />
            {/* Add others similarly */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;



