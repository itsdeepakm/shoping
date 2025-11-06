import { Link } from "react-router-dom";
import { useState } from "react";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validate = () => {
    const user=JSON.parse( localStorage.getItem("user") ||"[]");
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    if (!data.name.trim()) newErrors.name = "Name is required.";
    else if (!namePattern.test(data.name))
      newErrors.name = "Name must contain only alphabets.";
    else if (data.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    
    const phonePattern = /^[0-9]{10}$/;
    if (!data.phone.trim()) newErrors.phone = "Phone number is required.";
    if(user.some((u)=>u.phone===data.phone)){
      newErrors.phone = "Phone number already registered.";
    }
    else if (!phonePattern.test(data.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) newErrors.email = "Email is required.";
    if(user.some((u)=>u.email===data.email)){
      newErrors.email = "Email already registered.";
    }
    else if (!emailPattern.test(data.email))
      newErrors.email = "Enter a valid email address.";

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/;
    if (!data.password.trim()) newErrors.password = "Password is required.";
    else if (!passwordPattern.test(data.password))
      newErrors.password =
        "Password must include letters, numbers, and a special character.";

    if (!data.role.trim()) newErrors.role = "Please select a role.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
      const existingUsers = JSON.parse(localStorage.getItem("user") || "[]");
      let nextid=existingUsers.length+1;
    const username =
      data.role === "admin"
        ? `${data.name}_admin${nextid}`
        : `${data.name}_student${nextid}`;

    const userData = { ...data, username };

    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem("user", JSON.stringify(updatedUsers));
   Global.username=username;
    setGeneratedUsername(username);
    setData(initialDetails);
    setErrors({});
    setSuccess(true);
   
    
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
          onChange={handleInputChange}
          name="role"
          value={data.role}
        >
          <option value="">Select Role</option>
          <option value="user">Student</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}

        <button type="submit" className="register-btn">
          Register
        </button>
        <Link to="/login">
          <button type="button" className="login-btn">
            Login
          </button>
        </Link>
      </form>

      {success && (
        <div className="success-card">
          <h3>Registration Successful!</h3>
          <p>Your username is: <strong>{generatedUsername}</strong></p>
          <p>Please remember this for login.</p>
        </div>
      )}
    </div>
  );
}

