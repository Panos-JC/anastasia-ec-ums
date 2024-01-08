import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePasswordStyle.css";
import signupImage from "../images/signup-back.jpg";
import Logo from "../images/logo.png";


const ChangePassword = () => {
  // User Data from API
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Input fields
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");

  // Error messages
  const [oldPmes, setOldPmes] = useState("");
  const [newPmes, setNewPmes] = useState("");
  const [confPmes, setConfPmes] = useState("");

  // Fetch data
  useEffect(() => {
    // Retrieve user data from API
    const fetchData = async () => {
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users"
      );
      const users = await response.json();

      // A user with a safe password cannot view change password page
      if (
        users.find(
          (user) =>
            user.username === localStorage.getItem("username") &&
            user.password === localStorage.getItem("password")
        ).isPasswordSafe
      ) {
        // If a user has a safe password redirect him to home
        navigate("/home");
      }

      setUser(
        users.find(
          (user) =>
            user.username === localStorage.getItem("username") &&
            user.password === localStorage.getItem("password")
        )
      );
    };
    fetchData();
  }, []);

  // Input handlers
  const handleOldPass = (e) => {
    setOldPass(e.target.value);
    if (e.target.value === "") {
      setOldPmes("Old password can't be empty.");
    } else if (e.target.value !== user.password) {
      setOldPmes("Incorrect password.");
    } else {
      setOldPmes("");
    }
  };

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
    if (e.target.value === "") {
      setNewPmes("Password can't be empty.");
    } else if (e.target.value.length < 6) {
      setNewPmes("Password must contain at least 6 characters.");
    } else {
      setNewPmes("");
    }
  };

  const handleConfPass = (e) => {
    setConfNewPass(e.target.value);
    if (e.target.value === "") {
      setConfPmes("Confirm password can't be empty.");
    } else if (e.target.value !== newPass) {
      setConfPmes("Password and corfirm password must match.");
    } else {
      setConfPmes("");
    }
  };

  // Handle save button
  const handleChangePass = async (e) => {
    // Change password - make put request to API
    e.preventDefault();

    const response = await fetch(
      "https://655b7080ab37729791a91da3.mockapi.io/users/users/" + user.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          isPasswordSafe: true,
          password: newPass,
        }),
      }
    );

    alert("Your password was succesfully updated!");
    // Redirect to home
    // navigate("/home"); problem here
  };

  return (
    <>
      <div className="cp-container">
      <div className="right-image">
        <img src={signupImage} id="signup-image" />
      </div>

      <div className="form-cont">
      <form className="change-pass-form">
      <img src={Logo} className="login-logo" alt="logo" />
      <h3>Change your password</h3>
      <p className="error">{oldPmes}</p>
        <label>Old Password</label>
        <input
          type="password"
          name="old-pass"
          onChange={handleOldPass}
          required
        />

        <p className="error">{newPmes}</p>
        <label>New Password</label>
        <input
          type="password"
          name="new-pass"
          onChange={handleNewPass}
          required
        />

        <p className="error">{confPmes}</p>
        <label>Confirm New Password</label>
        <input
          type="password"
          name="conf-pass"
          onChange={handleConfPass}
          required
        />

        <button
          disabled={
            oldPass !== user.password ||
            oldPass === "" ||
            newPass === "" ||
            confNewPass === "" ||
            newPass !== confNewPass ||
            newPass.length < 6
            ? true
            : false
          }
          onClick={handleChangePass}
          className="btn"
        >
          Save
        </button>
      </form>
      </div>
      </div>
    </>
  );
};

export default ChangePassword;
