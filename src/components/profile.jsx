import "./profile.css";
import Navbar from "./navbar";
import { useState, useEffect } from "react";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "", phones: [""], emails: [""] });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("user")) || [];
    setUsers(storedUsers);
  }, []);

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((j, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUsers));
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditData(users[index]);
  };

  const handleEditChange = (e, field, idx) => {
    const value = e.target.value;
    if (field === "phones" || field === "emails") {
      const updated = [...editData[field]];
      updated[idx] = value;
      setEditData({ ...editData, [field]: updated });
    } else {
      setEditData({ ...editData, [field]: value });
    }
  };

  const handleAddField = (field) => {
    setEditData({ ...editData, [field]: [...editData[field], ""] });
  };

  const handleRemoveField = (field, idx) => {
    if (editData[field].length === 1) return;
    const updated = editData[field].filter((_, i) => i !== idx);
    setEditData({ ...editData, [field]: updated });
  };

  const handleSaveEdit = () => {
    const updatedUsers = [...users];
    updatedUsers[editingIndex] = editData;
    setUsers(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUsers));
    setEditingIndex(null);
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1>Profile Page</h1>
        <h2>Registered Users</h2>
        <div className="user-list">
          {users.length === 0 ? (
            <p>No registered users found.</p>
          ) : (
            users.map((user, index) => (
              <div className="user-card" key={index}>
                {editingIndex === index ? (
                  <div className="edit-card">
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleEditChange(e, "name")}
                      placeholder="Edit Name"
                      className="input-field"
                    />
                    <select
                      value={editData.role}
                      onChange={(e) => handleEditChange(e, "role")}
                      className="input-field"
                    >
                      <option value="">Select Role</option>
                      <option value="user">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                    <div className="edit-section">
                      <strong>Phone Numbers:</strong>
                      {editData.phones.map((phone, i) => (
                        <div key={i} className="edit-row">
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => handleEditChange(e, "phones", i)}
                            className="input-field"
                          />
                          {editData.phones.length > 1 && (
                            <button onClick={() => handleRemoveField("phones", i)} className="remove-btn">remove</button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => handleAddField("phones")} className="add-btn">Add Phone</button>
                    </div>
                    <div className="edit-section">
                      <strong>Emails:</strong>
                      {editData.emails.map((email, i) => (
                        <div key={i} className="edit-row">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEditChange(e, "emails", i)}
                            className="input-field"
                          />
                          {editData.emails.length > 1 && (
                            <button onClick={() => handleRemoveField("emails", i)} className="remove-btn">remove</button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => handleAddField("emails")} className="add-btn">Add Email</button>
                    </div>
                    <div className="edit-actions">
                      <button onClick={handleSaveEdit} className="save-btn">Save</button>
                      <button onClick={() => setEditingIndex(null)} className="cancel-btn"> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>{user.name}</h3>
                    <p><strong>Role:</strong> {user.role}</p>
                    <div className="info-section">
                      <strong>Phone Numbers:</strong>
                      <ul>{user.phones?.map((p, i) => <li key={i}>{p}</li>)}</ul>
                    </div>
                    <div className="info-section">
                      <strong>Emails:</strong>
                      <ul>{user.emails?.map((e, i) => <li key={i}>{e}</li>)}</ul>
                    </div>
                    <div className="user-actions">
                      <button onClick={() => handleEditClick(index)} className="edit-btn"> Edit</button>
                      <button onClick={() => handleDeleteUser(index)} className="delete-btn"> Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
