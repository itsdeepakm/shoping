import { useState, useRef } from "react";
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
  const [serverError, setServerError] = useState({});
  const debounceRef = useRef(null);

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
        if (!value.trim()) message = "Role is required.";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const checkPhoneOrEmailExist = async (field, value) => {
    if (!value) return;

    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();

      if (field === "phone" && users.some((u) => u.phone === value)) {
        setErrors((prev) => ({ ...prev, phone: "Phone number already exists." }));
      }

      if (field === "email" && users.some((u) => u.email === value)) {
        setErrors((prev) => ({ ...prev, email: "Email already exists." }));
      }
    } catch (err) {message:"Error checking existing users."}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);

    if (name === "phone" || name === "email") {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        checkPhoneOrEmailExist(name, value);
      }, 400);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError({});

    if (Object.values(errors).some((msg) => msg && msg.length > 0)) return;

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.errors || { general: result.message });
        return;
      }

      setGeneratedUsername(result.user.username);
      Global.username = result.user.username;
      setData(initialDetails);
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setServerError({ general: error.message });
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

        <button type="submit" className="register-btn">Register</button>

        {success && (
          <div className="success-card">
            <h3>Registration Successful!</h3>
            <p>Your username is: <strong>{generatedUsername}</strong></p>
            <p>Please remember this for login.</p>
            <button onClick={() => (window.location.href = "/login")}>
              Login
            </button>
          </div>
        )}
      </form>

      {serverError.general && <p className="error">{serverError.general}</p>}
    </div>
  );
}
