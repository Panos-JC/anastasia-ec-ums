import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  // User Data from API
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Input fields
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confNewPass, setConfNewPass] = useState();

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
  };

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfPass = (e) => {
    setConfNewPass(e.target.value);
  };

  // Handle save button
  const handleChangePass = async (e) => {
    // Change password here ......
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

    alert("success!");
    // Redirect to home
    // navigate("/home");
  };

  return (
    <>
      <h2>This is the change password page!!</h2>
      <form className="change-pass-form">
        <label>Old Password</label>
        <input
          type="password"
          name="old-pass"
          onChange={handleOldPass}
          required
        />

        <label>New Password</label>
        <input
          type="password"
          name="new-pass"
          onChange={handleNewPass}
          required
        />

        <label>Confirm New Password</label>
        <input
          type="password"
          name="conf-pass"
          onChange={handleConfPass}
          required
        />

        <button
          // disabled={
          //   // oldPass !== user.password ||
          //   // oldPass === "" ||
          //   // newPass === "" ||
          //   // confNewPass === "" ||
          //   // newPass !== confNewPass
          //   // newPass.length < 6
          // }
          onClick={handleChangePass}
        >
          Save
        </button>
      </form>
    </>
  );
};

export default ChangePassword;
