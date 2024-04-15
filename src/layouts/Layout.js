import React from "react";
import NavbarComponent from "../components/NavbarComponent";

const Layout = ({ children }) => {
  return (
    <div className="grid">
      <NavbarComponent />
      {children}
    </div>
  );
};

export default Layout;
