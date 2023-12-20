import "./AdminPageStyle.css";
import { useState, useEffect } from "react";
import Logo from "../images/logo.png";

const AdminPage = () => {
  const savedUsername = localStorage.getItem("username");
  const [users, setUsers] = useState([]);
  const [editable, setEditable] = useState(false);

  // Fetch data
  useEffect(() => {
    // Retrieve user data from API
    const fetchData = async () => {
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users"
      );
      const users = await response.json();
      setUsers(users);
      console.log(users);
    };

    fetchData();
  }, []);

  // Method that deletes a user from api
  const handleDelete = async (id) => {
    const response = await fetch(
      "https://655b7080ab37729791a91da3.mockapi.io/users/users/" + id,
      {
        method: "DELETE",
      }
    );
    window.location.reload();
  };

  return savedUsername !== "admin" ? (
    <h1>You are unauthorized to view this page.</h1>
  ) : (
    <div className="admin-cont">
      <img src={Logo} className="home-logo" alt="logo" />
      <h2>Users Administration</h2>

      <table>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Fullname</th>
          <th>Age</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>

        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.fullName}</td>
            <td>{user.age}</td>
            <td>{user.role}</td>
            <td>
              <button className="edit-btn">Edit</button> /{" "}
              <button
                className="delete-btn"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AdminPage;
