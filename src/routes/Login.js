import { useState, useEffect } from "react";
import "./LoginStyle.css";
import loginImage from "../images/login-back.jpg";
import Logo from "../images/logo.png";

const Login = () => {
  // States for username, password and users retrieved from the mock API
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState();

  // Retrieve user data from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users"
      );
      const users = await response.json();
      setUsers(users);
      console.log(users);
    };

    fetchData();
  }, []);

  // Handle changes in inputs
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value !== "");
  };

  // Handle checkbox
  const handleCheck = (e) => {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setChecked(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Search for user with credentials from input fields (this will be an object)
    const loggedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (loggedUser) {
      // Save keep me logged in in local storage
      // If checkbox is checked
      if (checked) {
        // Save username, password and checkbox value as an array in Local Storage
        localStorage.setItem(
          "keepMeLoggedIn",
          JSON.stringify([username, password, checked])
        );
      }

      alert("Sucessful login!");
    } else {
      alert("The credentials you provided are invalid!");
    }
  };

  return (
    <div className="container">
      <div className="left-image">
        <img src={loginImage} id="login-image" />
      </div>
      <div className="content">
        <form className="login-form">
          <img src={Logo} className="login-logo" alt="logo" />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button
            className="btn"
            disabled={username === "" && password === ""}
            onClick={handleLogin}
          >
            Login
          </button>

          <div className="check">
            <input
              type="checkbox"
              id="lg"
              name="lg-check"
              onChange={handleCheck}
            />
            <label for="lg-check"> Keep me logged in</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
