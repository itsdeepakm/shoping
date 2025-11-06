import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();

  const initialDetails = {
    name: "",
    phones: [""],
    emails: [""],
    password: "",
    role: "",
  };

  const [data, setData] = useState(initialDetails);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePhoneChange = (index, value) => {
    const updatedPhones = [...data.phones];
    updatedPhones[index] = value;
    setData({ ...data, phones: updatedPhones });
  };

  const addPhone = () => {
    if (data.phones[data.phones.length - 1].trim() !== "") {
      setData({ ...data, phones: [...data.phones, ""] });
    }
  };

  const removePhone = (index) => {
    if (data.phones.length === 1) return;
    const updatedPhones = data.phones.filter((_, i) => i !== index);
    setData({ ...data, phones: updatedPhones });
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...data.emails];
    updatedEmails[index] = value;
    setData({ ...data, emails: updatedEmails });
  };

  const addEmail = () => {
    if (data.emails[data.emails.length - 1].trim() !== "") {
      setData({ ...data, emails: [...data.emails, ""] });
    }
  };

  const removeEmail = (index) => {
    if (data.emails.length === 1) return;
    const updatedEmails = data.emails.filter((_, i) => i !== index);
    setData({ ...data, emails: updatedEmails });
  };

  const validate = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    if (!data.name.trim()) newErrors.name = "Name is required.";
    else if (!namePattern.test(data.name)) newErrors.name = "Name must contain only alphabets.";
    else if (data.name.length < 3) newErrors.name = "Name must be at least 3 characters.";
    const phonePattern = /^[0-9]{10}$/;
    data.phones.forEach((phone, index) => {
      if (!phone.trim()) newErrors[`phone${index}`] = "Phone number is required.";
      else if (!phonePattern.test(phone)) newErrors[`phone${index}`] = "Enter a valid 10-digit phone number.";
    });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    data.emails.forEach((email, index) => {
      if (!email.trim()) newErrors[`email${index}`] = "Email is required.";
      else if (!emailPattern.test(email)) newErrors[`email${index}`] = "Enter a valid email address.";
    });
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/;
    if (!data.password.trim()) newErrors.password = "Password is required.";
    else if (!passwordPattern.test(data.password)) newErrors.password = "Password must include letters, numbers, and a special character.";
    if (!data.role.trim()) newErrors.role = "Please select a role.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const existingUsers = JSON.parse(localStorage.getItem("user") || "[]");
    const updatedUsers = [...existingUsers, data];
    localStorage.setItem("user", JSON.stringify(updatedUsers));
    setData(initialDetails);
    setErrors({});
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate("/login");
    }, 2000);
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
        <label>Phone Numbers:</label>
        {data.phones.map((phone, index) => (
          <div key={index} className="multi-input">
            <input
              type="text"
              placeholder={`Phone Number ${index + 1}`}
              className="input-field"
              value={phone}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
            />
            {data.phones.length > 1 && (
              <button type="button" className="remove-btn" onClick={() => removePhone(index)}>
                remove
              </button>
            )}
            {errors[`phone${index}`] && <p className="error">{errors[`phone${index}`]}</p>}
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addPhone}>Add Phone</button>
        <label>Emails:</label>
        {data.emails.map((email, index) => (
          <div key={index} className="multi-input">
            <input
              type="email"
              placeholder={`Email ${index + 1}`}
              className="input-field"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
            />
            {data.emails.length > 1 && (
              <button type="button" className="remove-btn" onClick={() => removeEmail(index)}>
                remove
              </button>
            )}
            {errors[`email${index}`] && <p className="error">{errors[`email${index}`]}</p>}
          </div>
        ))}
        <button type="button" className="add-btn" onClick={addEmail}>Add Email</button>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input-field"
          value={data.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <select className="input-field" onChange={handleInputChange} name="role" value={data.role}>
          <option value="">Select Role</option>
          <option value="user">Student</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}
        <button type="submit" className="register-btn">Register</button>
        <Link to="/login">
          <button type="button" className="login-btn">Login</button>
        </Link>
      </form>
      {success && (
        <div className="success-card">
          <h3>Registration Successful</h3>
          <p>Redirecting to login page...</p>
        </div>
      )}
    </div>
  );
}
