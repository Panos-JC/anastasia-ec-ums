import loginImage from "../images/home-back.jpg";
import "./HomeStyle.css";
import Logo from "../images/logo.png";
import { useState, useEffect } from "react";

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
  const [passInput, setPassInput] = useState("");
  const [passConfInput, setPassConfInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);
  const [backup, setBackup] = useState({
    id: "",
    username: "",
    password: "",
    fullName: "",
    age: 0,
    role: "",
  });

  // Retrieve user data from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users"
      );
      const user = await response.json();

      // Find logged in user from saved credentials
      setUserData(
        user.find(
          (user) =>
            user.username === savedUsername && user.password === savedPassword
        )
      );

      // console.log(userData);
      setBackup(
        user.find(
          (user) =>
            user.username === savedUsername && user.password === savedPassword
        )
      );

      console.log(userData);
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
    setPassInput(e.target.value);
    setUserData({ ...userData, password: e.target.value });
  };

  const handleConfPassInputChange = (e) => {
    setPassConfInput(e.target.value);
  };

  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
    setUserData({ ...userData, fullName: e.target.value });
  };

  const handleAgeInputChange = (e) => {
    setAgeInput(e.target.value);
    setUserData({ ...userData, age: e.target.value });
  };

  // Handle save button
  const handleSave = async (e) => {
    console.log(userData);
    // if (userData.password !== passConfInput) {
    //   alert("Password is not the same!");
    // } else {
    const response = await fetch(
      "https://655b7080ab37729791a91da3.mockapi.io/users/users/" + userData.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    setEditable(editable);
    // }
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
        </form>
      </div>
    </div>
  );
};

export default Home;
