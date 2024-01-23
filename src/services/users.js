const API_URL = "https://655b7080ab37729791a91da3.mockapi.io/users";

// Get all users from api
export const getAllUsers = async () => {
    const response = await fetch(API_URL + "/users");
    const users = await response.json();
    return users;
}

// Get a user with a given username and password
export const getUserByNamePassword = async (savedUsername, savedPassword) => {
    const response = await fetch(API_URL + "/users");
    const users = await response.json();
    const user = users.find(
        (user) => user.username === savedUsername && user.password === savedPassword
    );
    return user;
}

// Delete a user with a given id
export const deleteUserWithId = async (id) => {
    await fetch(
        API_URL + "/users/" + id,
        {
          method: "DELETE",
        });
}

// Add new user
export const addNewUser = async (username, password) => {
    const response = await fetch(
        API_URL + "/users",
        {
            method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            role: "regular",
            isPasswordSafe: true,
          }),
        }
    );
    return response;
}

// Edit user with given id and data
export const editUserWithId = async (id, data) => {
    const response = await fetch(
        API_URL + "/users/" + id,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
    );
    return response;
}

// Change password
export const changeUserPass = async (id, user, newPass) => {
    const response = await fetch(
        API_URL + "/users/" + id,
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
    return response;
}

// Update user (admin feature)
export const updateUserFromAdmin = async (id, data) => {
    const respone = await fetch(
        API_URL + "/users/" + id,
        {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return respone;
}