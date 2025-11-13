import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./register.css";
import { Global } from "./global";

export default function Register() {
  const initialDetails = {
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  };

  const [data, setData] = useState(initialDetails);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState("");
  const [serverError, setServerError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "[]");
    setUsers(stored);
  }, []);

  const validateField = (name, value) => {
    let message = "";
    switch (name) {
      case "name":
        if (!value.trim()) message = "Name is required.";
        else if (!/^[A-Za-z\s]+$/.test(value))
          message = "Name must contain only alphabets.";
        else if (value.length < 3)
          message = "Name must be at least 3 characters.";
        break;
      case "phone":
        if (!value.trim()) message = "Phone number is required.";
        else if (users.some((u) => u.phone === value))
          message = "Phone number already registered.";
        else if (!/^[0-9]{10}$/.test(value))
          message = "Enter a valid 10-digit phone number.";
        break;
      case "email":
        if (!value.trim()) message = "Email is required.";
        else if (users.some((u) => u.email === value))
          message = "Email already registered.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          message = "Enter a valid email address.";
        break;
      case "password":
        if (!value.trim()) message = "Password is required.";
        else if (
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/.test(
            value
          )
        )
          message =
            "Password must include letters, numbers, and a special character.";
        break;
      case "role":
        if (!value.trim()) message = "Please select a role.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };
  const handlelogin = () => {
    window.location.href = "/login";
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateAll = () => {
    Object.keys(data).forEach((field) => validateField(field, data[field]));
    return Object.values(errors).every((err) => err === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    if (!validateAll()) return;
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Registration failed");
      setGeneratedUsername(result.user.username);
      Global.username = result.user.username;
      setData(initialDetails);
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="registerdiv">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input-field"
          value={data.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="input-field"
          value={data.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={data.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={data.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <select
          className="input-field"
          name="role"
          value={data.role}
          onChange={handleInputChange}
        >
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}

        <button type="submit" className="register-btn">
          Register
        </button>
        {/* <Link to="/login">
          <button type="button" className="login-btn">
            Login
          </button>
        </Link> */}
         {success && (
        <div className="success-card">
          <h3>Registration Successful!</h3>
          <p>
            Your username is: <strong>{generatedUsername}</strong>
          </p>
          <p>Please remember this for login.</p>
          <button onClick={handlelogin}> Login </button>
        </div>
      )}
      </form>

      {serverError && <p className="error">{serverError}</p>}

     
    </div>
  );
}
