import loginImage from "../images/home-back.jpg";
import "./HomeStyle.css";
import Logo from "../images/logo.png";
import { useState, useEffect } from "react";

const Home = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    fullName: "",
    age: 0,
    role: "",
  });
  const [editable, setEditable] = useState(false);
  const [savedPassword, setSavedPassword] = useState(localStorage.getItem("password"));
  const [savedUsername, setSavedUsername] = useState(localStorage.getItem("username"));

  // Inputs
  const [passInput, setPassInput] = useState("");
  const [passConfInput, setPassConfInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);



  // Retrieve user data from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users"
      );
      const user = await response.json();

      // Find logged in user from saved credentials
      setUserData(user.find(
        (user) =>
          user.username === savedUsername && user.password === savedPassword
      ));
      console.log(userData)
    };

    fetchData();

    

  }, []);

  // Handle edit button when clicked
  const handleEditCancel = (e) => {
    setEditable(!editable);
    if (editable === false) {
      // Cancel
      setUserData({
        username: userData.username,
        password: userData.password,
        fullName: userData.fullName,
        age: userData.age,
        role: userData.role,
      });
    }
    e.preventDefault();
  };


  // Input changes
  const handlePassInputChange = (e) => {
    setPassInput(e.target.value);
    console.log(e.target.value !== "");
  };

  const handleConfPassInputChange = (e) => {
    setPassConfInput(e.target.value);
    console.log(e.target.value !== "");
  };

  const handleNameInputChange = (e) => {
    setNameInput(e.target.value);
    console.log(e.target.value !== "");
  };

  const handleAgeInputChange = (e) => {
    setAgeInput(e.target.value);
    console.log(e.target.value !== "");
  };


  // Handle save button
  const handleSave = async (e) => {
    const response = await fetch(
      "https://655b7080ab37729791a91da3.mockapi.io/users/users/" + userData.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: nameInput,
          password: passInput,
          age: ageInput
        }),
      });
  }

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
                value={userData.password}
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
            <button className="btn-home" disabled={!editable} onClick={handleSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
