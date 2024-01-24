import loginImage from "../images/home-back.jpg";
import "./HomeStyle.css";
import Logo from "../images/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { editUserWithId, getUserByNamePassword } from "../services/users";

const Home = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    password: "",
    fullName: "",
    age: 0,
    role: "",
  });
  const [editable, setEditable] = useState(false);
  const savedPassword = localStorage.getItem("password");
  const savedUsername = localStorage.getItem("username");

  // Inputs
  const [passConfInput, setPassConfInput] = useState("");
  const [backup, setBackup] = useState({
    id: "",
    username: "",
    password: "",
    fullName: "",
    age: 0,
    role: "",
  });

  // Retrieve user with saved username and password from API
  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserByNamePassword(savedUsername, savedPassword);
      setUserData(user);
      setBackup(user);
    };

    fetchData();
  }, []);

  // Handle edit button when clicked
  const handleEditCancel = (e) => {
    // Toggle editable
    setEditable(!editable);

    // Cancel: Always set backup data (previous data from fetch)
    setUserData({
      id: backup.id,
      username: backup.username,
      password: backup.password,
      fullName: backup.fullName,
      age: backup.age,
      role: backup.role,
    });

    e.preventDefault();
  };

  // Input changes
  const handlePassInputChange = (e) => {
    setUserData({ ...userData, password: e.target.value });
  };

  const handleConfPassInputChange = (e) => {
    setPassConfInput(e.target.value);
  };

  const handleNameInputChange = (e) => {
    setUserData({ ...userData, fullName: e.target.value });
  };

  const handleAgeInputChange = (e) => {
    setUserData({ ...userData, age: e.target.value });
  };

  // Handle save button
  const handleSave = async (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Make sure that password and confirm password fields match
    if (userData.password != passConfInput) {
      alert("Password and confirm password fields must match!");
    } else {
      // Edit user info
      const response = await editUserWithId(userData.id, userData);

      if (response.ok) {
        // Store username password in local storage (just in case one of them has changed)
        localStorage.setItem("username", userData.username);
        localStorage.setItem("password", userData.password);

        // Change data inside form
        setBackup(userData);

        // 'Reset' form
        setEditable(null);
      } else {
        alert("Failed to save info.");
      }
    }
  };

  return (
    <div className="home-container">
      <div className="left-image">
        <img src={loginImage} id="home-image" />
      </div>

      <div className="home-content">
        <form className="home-form">
          <img src={Logo} className="home-logo" alt="logo" />

          <h3>Account Information</h3>

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            disabled={true}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            disabled={!editable}
            onChange={handlePassInputChange}
            required
          />

          {editable ? (
            <>
              <label>Confirm Password</label>
              <input
                type="password"
                name="conf-password"
                disabled={!editable}
                onChange={handleConfPassInputChange}
                required
              />
            </>
          ) : (
            ""
          )}

          <label>Fullname</label>
          <input
            type="text"
            name="fullname"
            value={userData.fullName}
            disabled={!editable}
            onChange={handleNameInputChange}
            required
          />

          <label>Age</label>
          <input
            type="number"
            name="age"
            value={userData.age}
            disabled={!editable}
            onChange={handleAgeInputChange}
            required
          />

          <label>Role</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            disabled={true}
            required
          />

          <div className="btns">
            <button className="btn-home" onClick={handleEditCancel}>
              {editable ? "Cancel" : "Edit"}
            </button>
            <button
              className="btn-home"
              disabled={!editable}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          {userData.username === "admin" ? (
            <p>
              Don't want to change your info? <br />
              Go to{" "}
              <u>
                <Link to="/all-users">users administration</Link>
              </u>{" "}
              page
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Home;
