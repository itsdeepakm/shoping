import { useState, useEffect } from "react";
import Navbar from "./navbar";
import "./studentprofile.css";

export default function Studentprofile() {
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showpopup, setshowpopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async (username) => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${username}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();

        if (response.ok) {
          const userData = data.user || {};
          userData.phones = Array.isArray(userData.phones)
            ? userData.phones
            : [userData.phone || ""];
          userData.emails = Array.isArray(userData.emails)
            ? userData.emails
            : [userData.email || ""];

          setUser(userData);
          setSuccess(true);
        } else {
          console.error(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser && storedUser.username) {
      fetchUserData(storedUser.username);
    } else {
      console.warn("No logged-in user found in localStorage");
    }
  }, []);

  if (!user) return <p>Loading user data...</p>;

  const handleAddPhone = () => {
    setUser((prev) => ({ ...prev, phones: [...prev.phones, ""] }));
  };

  const handleDeletePhone = (index) => {
    if (user.phones.length > 1) {
      const updated = user.phones.filter((_, i) => i !== index);
      setUser((prev) => ({ ...prev, phones: updated }));
    }
  };

  const handlePhoneChange = (index, value) => {
    const updated = [...user.phones];
    updated[index] = value;
    setUser((prev) => ({ ...prev, phones: updated }));
  };

  const handleAddEmail = () => {
    setUser((prev) => ({ ...prev, emails: [...prev.emails, ""] }));
  };

  const handleDeleteEmail = (index) => {
    if (user.emails.length > 1) {
      const updated = user.emails.filter((_, i) => i !== index);
      setUser((prev) => ({ ...prev, emails: updated }));
    }
  };

  const handleEmailChange = (index, value) => {
    const updated = [...user.emails];
    updated[index] = value;
    setUser((prev) => ({ ...prev, emails: updated }));
  };

  const handleEdit = (value) => {
    setUser((prev) => ({ ...prev, name: value }));
  };

  const handleSave = () => {
    setshowpopup(true);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setTimeout(() => setshowpopup(false), 3000);
  };

  const handlehomepage = () => {
    window.location.href = "/studentpage";
  };

  return (
    <>
      <Navbar />
      <button onClick={handlehomepage}>Go to Home Page</button>

      <div className="profile" style={{ padding: "20px" }}>
        <h2>Student Profile</h2>

        <div style={{ marginBottom: "15px" }}>
          <p><strong>Name:</strong>{user.name}</p>
          <input
            type="text"
            value={user.name || ""}
            onChange={(e) => handleEdit(e.target.value)}
            placeholder="Edit Name"
            style={{ width: "250px", padding: "6px" }}
          />
        </div>

        <p><strong>Role:</strong> {user.role}</p>

        <div>
          <h4>Phone Numbers</h4>
          {user.phones.map((phone, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px", gap: "8px" }}>
              <input
                type="text"
                value={phone}
                onChange={(e) => handlePhoneChange(index, e.target.value)}
                placeholder="Enter phone number"
                style={{ flex: 1, padding: "6px" }}
              />
              <button
                onClick={() => handleDeletePhone(index)}
                disabled={user.phones.length === 1}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: user.phones.length === 1 ? "not-allowed" : "pointer",
                  padding: "5px 10px",
                }}
              >
                X
              </button>
            </div>
          ))}
          <button onClick={handleAddPhone}>Add Phone</button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4>Emails</h4>
          {user.emails.map((email, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px", gap: "8px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="Enter email"
                style={{ flex: 1, padding: "6px" }}
              />
              <button
                onClick={() => handleDeleteEmail(index)}
                disabled={user.emails.length === 1}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: user.emails.length === 1 ? "not-allowed" : "pointer",
                  padding: "5px 10px",
                }}
              >
                X
              </button>
            </div>
          ))}
          <button onClick={handleAddEmail}>Add Email</button>
        </div>

        <button onClick={handleSave} style={{ marginTop: "20px" }}>
          Save Profile
        </button>

        {success && <p style={{ color: "green" }}>Profile loaded successfully!</p>}
      </div>

      {showpopup && <div className="success-card">Profile saved successfully!</div>}
    </>
  );
}
