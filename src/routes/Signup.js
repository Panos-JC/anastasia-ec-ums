import signupImage from "../images/signup-back.jpg";
import Logo from "../images/logo.png";
import { ButtonComponent, InputComponent } from "../components";
import { addNewUser, getAllUsers } from "../services/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupStyle } from "./styles";

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
      const users = await getAllUsers();
      setUsers(users);
    };

    fetchData();
  }, []);

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
      const response = await addNewUser(username, password);

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
          <InputComponent
            type={"text"}
            name={"username"}
            value={username}
            func={handleUsernameChange}
          />
          <p className="message">{pMessage}</p>
          <label>Password</label>
          <InputComponent
            type={"password"}
            name={"password"}
            value={password}
            func={handlePasswordChange}
          />
          <p className="message">{cMessage}</p>
          <label>Confirm Password</label>
          <InputComponent
            type={"password"}
            name={"confPassword"}
            value={confPassword}
            func={handleConfPasswordChange}
          />

          <ButtonComponent
            className={"btn"}
            disability={
              username === "" ||
              password === "" ||
              confPassword === "" ||
              password !== confPassword ||
              username === "admin" ||
              password.length < 6
                ? true
                : false
            }
            func={handleSignup}
            name={"Sign up"}
          />

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
