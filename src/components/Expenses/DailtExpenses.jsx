import { useEffect, useState } from "react";

const API_URL = "https://crudcrud.com/api/fc426fb8533a45a9bb058b7d196a0636/profileData";

const dailyExpenses = () => {
  const [profiles, setProfiles] = useState([]);
  const [Money, setMoney] = useState("");
  const [Discription, setDiscription] = useState("");
  const [category, setcategory] = useState("");
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
    if (!Money.trim() || !Discription.trim() || !category.trim()) return;

    const payload = { Money, Discription, category };

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
        } 
        else {
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
    setMoney(profile.Money);
    setDiscription(profile.Discription);
    setcategory(profile.category);
    setEditId(profile._id);
  };

  const resetForm = () => {
    setMoney("");
    setDiscription("");
    setcategory("");
    setEditId(null);
  };

  return (
    <>
      <h3>Welcome to Expense Tracker!</h3>
      <h3>{editId ? "Update Profile" : "Complete your profile"}</h3>

      <form onSubmit={handleSubmit}>
        <div className="text-container">
          <label htmlFor="Money">Your Money</label>
          <input
            type="text"
            id="Money"
            value={Money}
            required
            onChange={(e) => setMoney(e.target.value)}
          />
          <label htmlFor="url">Photo URL</label>
          <input
            type="text"
            id="discription"
            value={Discription}
            required
            onChange={(e) => setDiscription(e.target.value)}
          />
          <input
            type="text"
            id="category"
            value={category}
            required
            onChange={(e) => setcategory(e.target.value)}
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
            <strong>{profile.Money}</strong> - {profile.Discription} - {profile.category}<hr></hr>
            <button onClick={() => handleEdit(profile)}>Edit</button>
            <button onClick={() => handleDelete(profile._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default dailyExpenses;
