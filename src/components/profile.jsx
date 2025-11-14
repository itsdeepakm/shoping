import "./profile.css";
import Navbar from "./navbar";
import { useState, useEffect } from "react";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    role: "",
    phones: [""],
    emails: [""],
    username: "",
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleDeleteUser = (username) => {
    setConfirmDelete(true);
    setCurrentUser(username);
  };

  const confirmDeleteUser = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`http://localhost:3000/api/users/${currentUser}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "User deleted successfully!");
        setUsers(users.filter((u) => u.username !== currentUser));
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setConfirmDelete(false);
      setCurrentUser(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
    setCurrentUser(null);
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
  
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${editData.username}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("User updated successfully!");
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = data.user;
        setUsers(updatedUsers);
        setEditingIndex(null);
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())||
    user.emails.some((email) =>
      email.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||  
    user.phones.some((phone) =>
      phone.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  return (
    <div>
      <Navbar />
      
      <button onClick={() => (window.location.href = "/home")}>
        Go to Home Page
      </button>
      <div className="search-container">
      <input type="text" placeholder="Search users..." className="search-bar" onChange={handleSearchChange}/>
      <button className="search-btn">Search</button>
    </div>
      <div className="profile-container">
        <h1>Profile Page</h1>
        <h2>Registered Users</h2>

        <div className="user-list">
          {users.length === 0 ? (
            <p>No registered users found.</p>
          ) : (
            filteredUsers.map((user, index) => (
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
                      <option value="Student">Student</option>
                      <option value="admin">Admin</option>
                    </select>

                    <div className="edit-section">
                      <strong>Phone Numbers:</strong>
                      {editData.phones.map((phone, i) => (
                        <div key={i} className="edit-row">
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) =>
                              handleEditChange(e, "phones", i)
                            }
                            className="input-field"
                          />
                          {editData.phones.length > 1 && (
                            <button
                              onClick={() => handleRemoveField("phones", i)}
                              className="remove-btn"
                            >
                              remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddField("phones")}
                        className="add-btn"
                      >
                        Add Phone
                      </button>
                    </div>

                    <div className="edit-section">
                      <strong>Emails:</strong>
                      {editData.emails.map((email, i) => (
                        <div key={i} className="edit-row">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                              handleEditChange(e, "emails", i)
                            }
                            className="input-field"
                          />
                          {editData.emails.length > 1 && (
                            <button
                              onClick={() => handleRemoveField("emails", i)}
                              className="remove-btn"
                            >
                              remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => handleAddField("emails")}
                        className="add-btn"
                      >
                        Add Email
                      </button>
                    </div>

                    <div className="edit-actions">
                      <button onClick={handleSaveEdit} className="save-btn">
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3>{user.name}</h3>
                    <p>
                      <strong>Role:</strong> {user.role}
                    </p>
                    <div className="info-section">
                      <strong>Phone Numbers:</strong>
                      <ul>
                        {user.phones?.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="info-section">
                      <strong>Emails:</strong>
                      <ul>
                        {user.emails?.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="user-actions">
                      <button
                        onClick={() => handleEditClick(index)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.username)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {confirmDelete && (
        <div className="success-card">
          <h3>Confirm Deletion</h3>
          <p>Are you sure you want to delete this user?</p>
          <div>
            <button onClick={confirmDeleteUser}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
