import signupImage from "../images/signup-back.jpg";
import Logo from "../images/logo.png";
import "./SignupStyle.css";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="right-image">
        <img src={signupImage} id="signup-image" />
      </div>
      <div className="signup-content">
        <form className="signup-form">
          <img src={Logo} className="login-logo" alt="logo" />
          <label>Username</label>
          <input type="text" name="username" required />

          <label>Password</label>
          <input type="password" name="password" required />

          <label>Confirm Password</label>
          <input type="password" name="password" required />

          <button className="btn">Sign up</button>

          <div className="check">
            <input type="checkbox" id="lg" name="lg-check" />
            <label for="lg-check"> Keep me logged in</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
