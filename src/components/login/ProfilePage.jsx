import { useEffect, useState } from "react";

const API_URL = "https://crudcrud.com/api/f3d95d1e75184e008daa0fdcbec0ff2e/profileData";
// const API_URL="https://loginpage-dailyexpence-app-default-rtdb.firebaseio.com/ExpensesData.json";

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProfiles(data);
    } catch {
      alert("Failed to load profiles");
    }
  };

  // save and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !photoUrl.trim()) return;

    const payload = { name, photoUrl };

    try {
      if (editId) {
        // Update existing
        const res = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();

        setProfiles((prev) =>
          prev.map((item) => (item._id === editId ? { ...item, ...payload } : item))
        );
      } else {
        // Create new
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        setProfiles((prev) => [...prev, data]);
      }

      resetForm();
    } catch {
      alert("Failed to save data");
    }
  };

  //DELETE
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProfiles((prev) => prev.filter((item) => item._id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  // EDIT
  const handleEdit = (profile) => {
    setName(profile.name);
    setPhotoUrl(profile.photoUrl);
    setEditId(profile._id);
  };

  const resetForm = () => {
    setName("");
    setPhotoUrl("");
    setEditId(null);
  };

  return (
    <>
      <h3>Welcome to Expense Tracker!</h3>
      <h3>{editId ? "Update Profile" : "Complete your profile"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="text-container">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="url">Photo URL</label>
          <input
            type="text"
            id="url"
            value={photoUrl}
            required
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>

        <div className="button-container">
          <button type="submit">{editId ? "UPDATE" : "SAVE"}</button>
          {editId && <button type="button" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <hr />
      <h3>Profiles</h3>
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id}>
            <strong>{profile.name}</strong> - {profile.photoUrl}
            <button onClick={() => handleEdit(profile)}>Edit</button>
            <button onClick={() => handleDelete(profile._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProfilePage;
