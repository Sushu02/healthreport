// src/components/HeaderContainer.jsx
import React from "react";
import "../styles/header.scss";

const HeaderContainer = ({ activeModule }) => {
  const defaultOptions = ["Option A", "Option B", "Option C"];

  return (
    <div className="header-container">
      <div className="header-title">{activeModule}</div>
      <select className="header-dropdown">
        {defaultOptions.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HeaderContainer;
