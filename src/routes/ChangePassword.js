import signupImage from "../images/signup-back.jpg";
import Logo from "../images/logo.png";
import { InputComponent } from "../components";
import { changeUserPass, getUserByNamePassword } from "../services/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { changePasswordStyle } from "./styles";

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

  const savedPassword = localStorage.getItem("password");
  const savedUsername = localStorage.getItem("username");

  // Fetch data
  useEffect(() => {
    // Retrieve user with saved username and password from API
    const fetchData = async () => {
      const user = await getUserByNamePassword(savedUsername, savedPassword);

      // A user with a safe password cannot view change password page
      if (user.isPasswordSafe) {
        // If a user has a safe password redirect him to home
        navigate("/home");
      }

      setUser(user);
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
    await changeUserPass(user.id, user, newPass);

    // Change password to local storage as well
    localStorage.setItem("password", newPass);

    // Notify user
    alert("Your password was succesfully updated!");

    // Redirect to home
    navigate("/home");
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

            <InputComponent
              type={"password"}
              name={"old-pass"}
              onChange={handleOldPass}
              label={"Old Password"}
            />

            <p className="error">{newPmes}</p>
            <InputComponent
              type={"password"}
              name={"new-pass"}
              onChange={handleNewPass}
              label={"New Password"}
            />

            <p className="error">{confPmes}</p>
            <InputComponent
              type={"password"}
              name={"conf-pass"}
              onChange={handleConfPass}
              label={"Confirm New Password"}
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
