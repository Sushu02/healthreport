// File: src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import HeaderContainer from "./HeaderContainer";
import { Outlet } from "react-router-dom";
import "../styles/layout.scss";
import "../styles/header.scss";



const Layout = () => (
  <div className="flex h-screen">
    <Navbar />
    <div className="flex flex-col flex-1">
      <HeaderContainer />
      <main className="p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;