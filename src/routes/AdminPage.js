import "./AdminPageStyle.css";
import { useState, useEffect } from "react";
import Logo from "../images/logo.png";

const AdminPage = () => {
  const savedUsername = localStorage.getItem("username");

  // Data from API
  const [users, setUsers] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const recordsOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // Keep records per page
  const handleRecordOptions = (e) => {
    setRecordsPerPage(e.target.value);
  };

  // Keep current page number
  const handlePageChange = (e) => {
    setCurrentPage(e.target.value);
  };

  // Go to next page
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Go to previous page
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Go to first page
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // Go to last page
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

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

      // Find total pages
      if (users.length % recordsPerPage === 0) {
        // If remaining is zero pages are the result of the division
        setTotalPages(parseInt(users.length / recordsPerPage));
      } else {
        // If remaining is not zero we need one more extra page
        setTotalPages(parseInt(users.length / recordsPerPage) + 1);
      }
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
      {/* <p>
        From {currentPage * recordsPerPage - recordsPerPage} to{" "}
        {currentPage * recordsPerPage}
      </p> */}
      <div className="table-cont">
        <table>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Fullname</th>
            <th>Age</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>

          {users
            .slice(
              currentPage * recordsPerPage - recordsPerPage, // First user of page
              currentPage * recordsPerPage // Last user of page
            )
            .map((user) => (
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
                      editUserId === user.id
                        ? editableUser.password
                        : user.password
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
                      editUserId === user.id
                        ? editableUser.fullName
                        : user.fullName
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
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(user.id)}
                  >
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

      <div className="pagination-settings">
        <div className="dropdowns">
          <label>Records per page: </label>
          <select onChange={handleRecordOptions}>
            {recordsOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <label>Pages:</label>
          <select onChange={handlePageChange}>
            {Array.from(
              {
                length:
                  users.length % recordsPerPage === 0
                    ? parseInt(users.length / recordsPerPage)
                    : parseInt(users.length / recordsPerPage) + 1,
              }, // Set length + 1
              (_, num) => num + 1 // Increase by one
            ).map((page) => (
              <option
                key={page}
                value={page}
                selected={page === currentPage ? true : false}
              >
                {page}
              </option>
            ))}
          </select>
        </div>

        <div className="nav-buttons">
          <button disabled={currentPage === 1} onClick={handleFirstPage}>
            First
          </button>
          <button disabled={currentPage === 1} onClick={handlePrevPage}>
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={handleLastPage}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
