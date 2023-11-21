import { useState, useEffect } from 'react';
import './LoginStyle.css';

const Login = () => {

    // States for username, password and users retrieved from the mock API
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [users, setUsers] = useState([]);

    // Retrieve user data from API
    useEffect(
        () => {
          const fetchData = async () => {
            const response = await fetch('https://655b7080ab37729791a91da3.mockapi.io/users/users');
            const users = await response.json();
            setUsers(users);
            console.log(users);
          };
    
          fetchData();
        },
        []
      );

    
    // Handle changes in inputs
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        console.log(e.target.value);
    }
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      console.log(e.target.value !== "");
    }

    const handleLogin = (e) => {
        // e.preventDefault();
    
        alert("Clicked!!");
      }

    return (
        <div classname="container">
            <form className="login-form">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} required/>

                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} required/>

                    <button className="btn" disabled={username === "" && password === ""} onClick={handleLogin}>Login</button>

                    <div>
                        <input type="checkbox" id="lg" name="lg-check"/>
                        <label for="vehicle1"> Keep me logged in</label>
                    </div>
            </form>
        </div>
    );
};

export default Login;