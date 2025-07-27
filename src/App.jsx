// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import "./styles/global.scss";

const App = () => {
  return (
    <div className="AppLayout">
      <Navbar />
      <div className="MainContent">
        <div className="PageHeader">Header</div>
        <div className="PageContent">
          <h2>Welcome to Health Report Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default App;



// App.jsx or MainLayout.jsx
// import React from "react";
// import Navbar from "./components/Navbar";
// import HeaderContainer from "./components/HeaderContainer";

// const App = () => {
//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Left sidebar */}
//       <Navbar />

//       {/* Right section (Header + Page Content) */}
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <HeaderContainer />
//         <div style={{ flex: 1 }}>
//           {/* Page content */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
