import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import { useState, useEffect } from "react";
import Signup from "./routes/Signup";

function App() {
  const [savedUsername, setSavedUsername] = useState("");
  const [savedPassword, setSavedPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [directHome, setDirectHome] = useState(true);

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

    // Check if user exists
    if (
      users.find(
        (user) =>
          user.username === savedUsername && user.password === savedPassword
      )
    ) {
      // Set a boolean value to true in order to be redirected to home page
      alert("You will be redirected to homepage because you are logged in!!");
      setDirectHome(true);
    }
  }, []);

  return (
    <Routes>
      <Route index element={directHome ? <Home /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
