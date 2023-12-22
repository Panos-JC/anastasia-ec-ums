import signupImage from "../images/signup-back.jpg";
import Logo from "../images/logo.png";
import "./SignupStyle.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = useState();
  const [uMessage, setUmessage] = useState("");
  const [pMessage, setPmessage] = useState("");
  const [cMessage, setCmessage] = useState("");

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

  //

  // Handle changes in inputs
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value === "") {
      setUmessage("Username can't be empty.");
    } else if (e.target.value === "admin") {
      setUmessage("Username can't be admin.");
    } else {
      setUmessage("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPmessage("Password can't be empty.");
    } else if (e.target.value.length < 6) {
      setPmessage("Password must contain at least 6 characters.");
    } else {
      setPmessage("");
    }
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
    if (e.target.value === "") {
      setCmessage("Confirm password can't be empty.");
    } else if (e.target.value !== password) {
      setCmessage("Password and corfirm password must match.");
    } else {
      setCmessage("");
    }
  };

  // Sign up handler
  const handleSignup = async (e) => {
    e.preventDefault();

    // Search for user with credentials from input fields
    const loggedUser = users.find((user) => user.username === username);

    if (!loggedUser) {
      // Make a post request to mock API
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            role: "regular",
            isPasswordSafe: true,
          }),
        }
      );

      // Save keep me logged in in local storage
      // If checkbox is checked
      if (checked) {
        // Save username, password and checkbox value as an array in Local Storage
        localStorage.setItem("keepMeLoggedIn", true);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        // Save username, password and checkbox value as an array in Local Storage
        localStorage.setItem("keepMeLoggedIn", false);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      }

      if (!response.ok) {
        alert("Server unavailable. Try again later.");
        navigate("/signup");
      } else {
        alert("Successful signup! You will be directed to the home page.");
        navigate("/home");
      }
    }
  };

  // Handle checkbox
  const handleCheck = (e) => {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setChecked(true);
    }
  };

  return (
    <div className="signup-container">
      <div className="right-image">
        <img src={signupImage} id="signup-image" />
      </div>
      <div className="signup-content">
        <form className="signup-form">
          <img src={Logo} className="login-logo" alt="logo" />
          <p className="message">{uMessage}</p>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <p className="message">{pMessage}</p>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <p className="message">{cMessage}</p>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confPassword"
            value={confPassword}
            onChange={handleConfPasswordChange}
            required
          />

          <button
            className="btn"
            disabled={
              username === "" ||
              password === "" ||
              confPassword === "" ||
              password !== confPassword ||
              username === "admin" ||
              password.length < 6
                ? true
                : false
            }
            onClick={handleSignup}
          >
            Sign up
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

export default Signup;
