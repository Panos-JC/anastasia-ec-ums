import './LoginStyle.css';

const Login = () => {
    return (
        <div classname="container">
            <form className="login-form">
                    <label>Username</label>
                    <input type="text" name="username" required/>
                    <label>Password</label>
                    <input type="password" name="password" required/>

                    <button className="btn">Login</button>

                    <div>
                        <input type="checkbox" id="lg" name="lg-check"/>
                        <label for="vehicle1"> Keep me logged in</label>
                    </div>
            </form>
        </div>
    );
};

export default Login;