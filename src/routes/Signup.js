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
    // console.log(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log(e.target.value);
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
    // console.log(e.target.value);
  };

  // Sign up handler
  const handleSignup = async (e) => {
    e.preventDefault();

    // Search for user with credentials from input fields
    const loggedUser = users.find(
      (user) => user.username === username && user.password === password
    );

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

      if (!response.ok) {
        throw new Error("Failed to make a POST request.");
      } else {
        alert("Successful signup! You will be directed to the home page.");
        navigate("/home");
      }
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
            <input type="checkbox" id="lg" name="lg-check" />
            <label for="lg-check"> Keep me logged in</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
