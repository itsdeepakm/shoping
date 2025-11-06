import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Global } from './global';

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleinputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setusername(value);
    if (name === "password") setpassword(value);
  };

  const validform = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9._@-]+$/;
    if (!usernameRegex.test(username)) {
      setError("Please enter a valid username.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!validform()) return;

    const storedUsers = JSON.parse(localStorage.getItem("user")) || [];
    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );
   console.log(user);
    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
      Global.currentUser = user;
      Global.role = user.role;
      Global.username = user.username;
      if (user.role === "admin") navigate("/home");
      else navigate("/studentpage");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <>
      <div className="logindiv">
        <form onSubmit={handlesubmit}>
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={handleinputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={handleinputChange}
          />
          <button type="submit">Login</button>
          <Link to="/register">
            <button type="button" className="register-btn">
              Register
            </button>
          </Link>
        </form>
      </div>

      {error && (
        <div className="error-popup">
          <div className="error-card">
            <h3>Login Failed</h3>
            <p>{error}</p>
            <button onClick={() => setError("")}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
