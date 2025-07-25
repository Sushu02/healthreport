// src/components/Navbar.jsx
import React from "react";
import logo from "../assets/logos/finkraft.png";
import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <nav className="NavigationContainer">
      <div className="PrimaryNav">
        <div className="navbarContainer">
          <img src={logo} alt="Logo" />
        </div>

        <div className="menuContainer">
          <div className="MenuItem">
            <svg viewBox="0 0 24 24">
              <path d="m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z" />
            </svg>
            <p>Dashboard</p>
          </div>
          <div className="menuitem">Invoice Download Health Report</div>
          <div className="menuitem">Report Download Health Report</div>
          <div className="menuitem">Trends</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
