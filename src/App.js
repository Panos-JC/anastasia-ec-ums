import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import { useState, useEffect } from "react";
import Signup from "./routes/Signup";
import { useNavigate } from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import ChangePass from "./routes/ChangePassword.js";

function App() {
  const [savedUsername, setSavedUsername] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    const loginAttempt = localStorage.getItem("keepMeLoggedIn");

    if (loginAttempt === "true") {
      setSavedUsername(localStorage.getItem("username"));
      setSavedPassword(localStorage.getItem("password"));
    }

    // Retrieve user data from API
    const fetchData = async () => {
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users"
      );
      const users = await response.json();
      setUsers(users);
    };

    fetchData();
  }, []);

  // Redirect if user is logged in
  useEffect(() => {
    // Check if user exists
    const user = users.find(
      (user) =>
        user.username === savedUsername && user.password === savedPassword
    );

    // If user exists and password is safe go to home
    if (user) {
      if (user.isPasswordSafe) {
        navigate("home");
      } else {
        // Else redirect user to change password
        alert(
          "Your password is unsafe. You will be redirected to a page in order to change it."
        );
        navigate("/change-password");
      }
    }
  }, [users]);

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} /> :
      <Route path="/signup" element={<Signup />} /> :
      <Route path="/home" element={<Home />} />
      <Route path="/all-users" element={<AdminPage />} />
      <Route path="/change-password" element={<ChangePass />} />
    </Routes>
  );
}

export default App;
