import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavbarComponentStyle.css";
import { Signup } from "../routes";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current route
  const route = location.pathname;
  console.log(route);

  // Left button label
  const [buttonLabel, setButtonLabel] = useState("Signup");

  useEffect(() => {
    // Based on the route the left button navigates to a different page
    if (route === "/login" || route === "/") {
      setButtonLabel("Sign up");
    } else if (route === "/signup") {
      setButtonLabel("Login");
    } else {
      setButtonLabel("Logout");
    }
  });

  // Navigate to login or signup page
  const handleBut = () => {
    if (route === "/login" || route === "/") {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <ul className="menu">
        <li className="but" onClick={handleBut}>
          {buttonLabel}
        </li>
        {route !== "/login" &&
          route !== "/" &&
          route !== "/signup" &&
          route !== "/change-password" && (
            <li
              onClick={() => navigate("/home")}
              className={route === "/home" && "active"}
            >
              Home
            </li>
          )}
        {route !== "/login" &&
          route !== "/" &&
          route !== "/signup" &&
          route !== "/change-password" && (
            <li
              onClick={() => navigate("/all-users")}
              className={route === "/all-users" && "active"}
            >
              Admin Page
            </li>
          )}
      </ul>
    </div>
  );
};

export default NavbarComponent;
