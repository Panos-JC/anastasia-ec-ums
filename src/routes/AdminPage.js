import "./AdminPageStyle.css";
import { useState, useEffect } from "react";
import Logo from "../images/logo.png";

const AdminPage = () => {
  const savedUsername = localStorage.getItem("username");
  const [users, setUsers] = useState([]);
  const [disable, setDisable] = useState(true);

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

  const handleEdit = (id) => {
    setDisable(!disable);
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
                value={user.password}
                disabled={disable}
                required
              />
            </td>
            <td>
              <input
                type="text"
                name="fullname"
                value={user.fullName}
                disabled={disable}
                required
              />
            </td>
            <td>
              <input
                type="number"
                name="username"
                value={user.age}
                disabled={disable}
                required
              />
            </td>
            <td>
              <select id="role" name="roles" disabled={disable}>
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
                {disable === true ? "Edit" : "Save"}
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
