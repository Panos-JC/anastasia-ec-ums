import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import { useState, useEffect } from "react";

function App() {
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState([]);

  // Get keep me logged in from local storage (if it exists)
  useEffect(() => {
    const keepMeLoggedIn = localStorage.getItem("keepMeLoggedIn");
    if (keepMeLoggedIn) {
      setKeepMeLoggedIn(keepMeLoggedIn);
      console.log(typeof keepMeLoggedIn);
    }
  }, []);

  // console.log(keepMeLoggedIn[2]);

  // if (keepMeLoggedIn[2]) {
  //   alert("Automatic login for saved user...");
  // }

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
