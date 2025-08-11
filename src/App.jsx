// // src/App.jsx
import React , {useState}from "react";
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
  const [selectedPortal, setSelectedPortal] = useState("All data");
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route 
              path="/invoice-checkup" 
              element={<InvoiceCheckup selectedPortal={selectedPortal} />} 
            />
            <Route 
              path="/report-checkup" 
              element={<ReportCheckup selectedPortal={selectedPortal} />} 
            />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/trends" element={<Trends />} />
            {/* Add other routes similarly */}
          </Routes>
        </div>
      </div>
    </Router>
  );

};

export default App;



