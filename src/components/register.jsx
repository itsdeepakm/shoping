
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './register.css'

export default function Register() {
  const navigate = useNavigate();

  const initialDetails = {
    username: "",
    email: "",
    password: "",
  };

  const [data, setdata] = useState(initialDetails);
  const [errors, setErrors] = useState({});

  const handleinputChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    
    if (!data.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (data.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(data.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/;
    if (!data.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!passwordPattern.test(data.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and include letters, numbers, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const getdata = JSON.parse(localStorage.getItem("user") || "[]");
    const arr = [...getdata, data];
    localStorage.setItem("user", JSON.stringify(arr));
    setdata(initialDetails);

    navigate("/login");
  };

  return (
    <div className="registerdiv">
      <h1>Register</h1>
      <form onSubmit={handlesubmit} className="register-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input-field"
          value={data.username}
          onChange={handleinputChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input-field"
          value={data.email}
          onChange={handleinputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={data.password}
          onChange={handleinputChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit" className="register-btn">
          Register
        </button>

        <Link to="/login">
          <button type="button" className="login-btn">
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}
