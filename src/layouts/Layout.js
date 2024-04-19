import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import "./LayoutStyle.css";

const Layout = ({ children }) => {
  return (
    <div className="grid">
      <NavbarComponent />
      {children}
      <FooterComponent />
    </div>
  );
};

export default Layout;
