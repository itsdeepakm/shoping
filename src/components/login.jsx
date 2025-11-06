import './login.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Global } from './global';

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleinputChange = (e) => {
    if (e.target.name === "email") setemail(e.target.value);
    if (e.target.name === "password") setpassword(e.target.value);
  };

  const validform = () => {
    if (!email || !password) {
      setError("Both fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
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
    const usersArray = Array.isArray(storedUsers) ? storedUsers : [storedUsers];

    const user = usersArray.find(
      (item) =>
        Array.isArray(item.emails)
          ? item.emails.some((em) => em.toLowerCase() === email.toLowerCase())
          : item.email?.toLowerCase() === email.toLowerCase()
    );

    if (user && user.password === password) {
      Global.currentUser = user;
      Global.role = user.role;
      Global.username=user.name+"_"+Math.floor(Math.random()*1000);
      console.log(Global.username);
      if (user.role === "admin") navigate("/home");
      else navigate("/studentpage");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <div className="logindiv">
        <form onSubmit={handlesubmit}>
          <h1>Login</h1>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input-field"
            onChange={handleinputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
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
