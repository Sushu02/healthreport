// // src/components/Navbar.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logos/finkraft.png";
// import "../styles/navbar.scss";

// const Navbar = () => {
//   return (
//     <nav className="NavigationContainer">
//       <div className="PrimaryNav">
//         <div className="navbarContainer">
//           <img src={logo} alt="Logo" />
//         </div>

//         <div className="menuContainer">
//           <div className="MenuItem">
//             <svg viewBox="0 0 24 24">
//               <path d="m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z" />
//             </svg>
//             <p>Dashboard</p>
//           </div>

//           <div className="MenuItem">
//           <Link to="/invoice" className="MenuItem">
//             <svg viewBox="0 0 24 24">
//               <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z" />
//             </svg>
//             <p>Invoice Checkup</p>
//             </Link>
//           </div>

//           <div className="MenuItem">
//             <svg viewBox="0 0 24 24">
//               <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z" />
//             </svg>
//             <p>Report Checkup</p>
//           </div>

//           <div className="MenuItem">
//             <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
//               <path d="M14.2219 0H13.333C12.3511 0 11.5552 0.795938 11.5552 1.77778V14.2222C11.5552 15.2041 12.3511 16 13.333 16H14.2219C15.2038 16 15.9997 15.2041 15.9997 14.2222V1.77778C15.9997 0.795938 15.2038 0 14.2219 0Z" fill="#C3C4CD"/>
//               <path d="M8.44457 5.3335H7.55566C6.57379 5.3335 5.77783 6.12943 5.77783 7.11127V14.2224C5.77783 15.2042 6.57379 16.0002 7.55566 16.0002H8.44457C9.42643 16.0002 10.2224 15.2042 10.2224 14.2224V7.11127C10.2224 6.12943 9.42643 5.3335 8.44457 5.3335Z" fill="#C3C4CD"/>
//               <path d="M2.66673 11.5557H1.77782C0.795959 11.5557 0 12.3516 0 13.3334V14.2223C0 15.2042 0.795959 16.0001 1.77782 16.0001H2.66673C3.6486 16.0001 4.44456 15.2042 4.44456 14.2223V13.3334C4.44456 12.3516 3.6486 11.5557 2.66673 11.5557Z" fill="#C3C4CD"/>
//             </svg>
//             <p>Trends</p>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// src/components/Sidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../styles/navbar.scss";
// import logo from "../assets/logos/finkraft.png";

// const menuItems = [
//   "Dashboard",
//   "Credentials",
//   "Invoice Checkup",
//   "Report Checkup",
//   "Trends"
// ];

// const Navbar = () => {
//   return (
//     <div className="sidebar">
//       <div className="logo">
//       <img src={logo} alt="Logo" />
//       </div>
//       <ul className="menu">
//         {menuItems.map(item => (
//           <li key={item}>
//             <NavLink
//               to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
//               className={({ isActive }) => isActive ? "active" : ""}
//             >
//               {item}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Navbar;


// src/components/Sidebar.jsx
// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.scss";
import logo from "../assets/logos/finkraft.png";

const menuItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z" />
      </svg>
    )
  },
  {
    label: "Credentials",
    to: "/credentials",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H13l2 2 2-2 2 2 4-4.04zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3" />
      </svg>
    )
  },
  {
    label: "Invoice Checkup",
    to: "/invoice-checkup",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z" />
      </svg>
    )
  },
  {
    label: "Report Checkup",
    to: "/report-checkup",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z" />
      </svg>
    )
  },
  {
    label: "Trends",
    to: "/trends",
    icon: (
      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
        <path d="M14.2219 0H13.333C12.3511 0 11.5552 0.795938 11.5552 1.77778V14.2222C11.5552 15.2041 12.3511 16 13.333 16H14.2219C15.2038 16 15.9997 15.2041 15.9997 14.2222V1.77778C15.9997 0.795938 15.2038 0 14.2219 0Z" fill="#C3C4CD"/>
        <path d="M8.44457 5.3335H7.55566C6.57379 5.3335 5.77783 6.12943 5.77783 7.11127V14.2224C5.77783 15.2042 6.57379 16.0002 7.55566 16.0002H8.44457C9.42643 16.0002 10.2224 15.2042 10.2224 14.2224V7.11127C10.2224 6.12943 9.42643 5.3335 8.44457 5.3335Z" fill="#C3C4CD"/>
        <path d="M2.66673 11.5557H1.77782C0.795959 11.5557 0 12.3516 0 13.3334V14.2223C0 15.2042 0.795959 16.0001 1.77782 16.0001H2.66673C3.6486 16.0001 4.44456 15.2042 4.44456 14.2223V13.3334C4.44456 12.3516 3.6486 11.5557 2.66673 11.5557Z" fill="#C3C4CD"/>
      </svg>
    )
  }
];

const Navbar = () => {
      return (
        <div className="sidebar">
          <div className="logo">
          <img src={logo} alt="Logo" />
          </div>
          <ul className="menu">
          {menuItems.map(({ label, to, icon }) => (
            <li key={label} className="menu-item">
                <NavLink
                to={to}
                className={({ isActive }) => (isActive ? "active" : "")}
                >
                <div className="icon-container">{icon}</div>
                <div className="label">{label}</div>
                </NavLink>
            </li>
            ))}
          </ul>
        </div>
      );
    };

export default Navbar;
