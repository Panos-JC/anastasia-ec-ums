import "./AdminPageStyle.css";
import { useState, useEffect } from "react";
import Logo from "../images/logo.png";

const AdminPage = () => {
  const savedUsername = localStorage.getItem("username");

  // Data from API
  const [users, setUsers] = useState([]);

  // Keep id and data of editing user
  const [editUserId, setEditUserId] = useState(null);
  const [editableUser, setEditableUser] = useState({
    id: "",
    username: "",
    password: "",
    fullName: "",
    age: 0,
    role: "",
  });

  // Fetch data
  useEffect(() => {
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

  // Method that handles edit and save
  const handleEdit = async (id) => {
    // Edit Mode
    if (editUserId !== id) {
      setEditUserId(id);
      setEditableUser(users.find((user) => user.id === id));
      console.log(editableUser);
    } else {
      // Save Mode
      // Update API with new data
      const response = await fetch(
        "https://655b7080ab37729791a91da3.mockapi.io/users/users/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableUser),
        }
      );
      setEditUserId(null);
      window.location.reload();
    }
  };

  // Handle Input Changes
  const handlePassInputChange = (e) => {
    setEditableUser({
      ...editableUser,
      password: e.target.value,
      isPasswordSafe: false,
    });
  };

  const handleNameInputChange = (e) => {
    setEditableUser({ ...editableUser, fullName: e.target.value });
  };

  const handleAgeInputChange = (e) => {
    setEditableUser({ ...editableUser, age: e.target.value });
  };

  const handleRoleInputChange = (e) => {
    setEditableUser({ ...editableUser, role: e.target.value });
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
            <td>
              <input
                type="text"
                name="username"
                value={user.username}
                disabled={true}
                required
              />
            </td>
            <td>
              <input
                type="password"
                name="username"
                value={
                  editUserId === user.id ? editableUser.password : user.password
                }
                disabled={editUserId !== user.id}
                onChange={handlePassInputChange}
                required
              />
            </td>
            <td>
              <input
                type="text"
                name="fullname"
                value={
                  editUserId === user.id ? editableUser.fullName : user.fullName
                }
                disabled={editUserId !== user.id}
                onChange={handleNameInputChange}
                required
              />
            </td>
            <td>
              <input
                type="number"
                name="username"
                value={editUserId === user.id ? editableUser.age : user.age}
                disabled={editUserId !== user.id}
                onChange={handleAgeInputChange}
                required
              />
            </td>
            <td>
              <select
                id="role"
                name="roles"
                disabled={editUserId !== user.id}
                onChange={handleRoleInputChange}
              >
                <option
                  value="regular"
                  selected={user.role === "regular" ? true : false}
                >
                  Regular
                </option>
                <option
                  value="admin"
                  selected={user.role === "admin" ? true : false}
                >
                  Admin
                </option>
              </select>
            </td>
            <td>
              <button className="edit-btn" onClick={() => handleEdit(user.id)}>
                {editUserId !== user.id ? "Edit" : "Save"}
              </button>{" "}
              /{" "}
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
