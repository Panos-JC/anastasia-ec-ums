import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
