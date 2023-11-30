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
  const [password, setPassword] = useState("");

  // Retrieve user data from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users/1"
      );
      const user = await response.json();
      setUserData(user);
      console.log(user);
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
            required
          />

          <label>Age</label>
          <input
            type="number"
            name="age"
            value={userData.age}
            disabled={!editable}
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
            <button className="btn-home" disabled={!editable}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
