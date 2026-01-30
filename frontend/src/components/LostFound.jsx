import { useEffect, useState } from "react";
import {
  getLostFound,
  createLostFound,
  updateLostFoundStatus
} from "../services/api";
import "./LostFound.css";

export default function LostFound() {
  const role = localStorage.getItem("role");

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    location: "",
    status: "Lost"
  });

  const loadItems = async () => {
    const data = await getLostFound();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const submitItem = async () => {
    await createLostFound(form);
    setForm({ itemName: "", description: "", location: "", status: "Lost" });
    loadItems();
  };

  const changeStatus = async (id, status) => {
    await updateLostFoundStatus(id, status);
    loadItems();
  };

  return (
    <div className="lostfound-page">
      <div className="lostfound-container">
        <h2 className="lostfound-title">Lost & Found</h2>

        {/* STUDENT FORM */}
        {role === "student" && (
          <div className="lostfound-form">
            <input
              placeholder="Item name"
              value={form.itemName}
              onChange={(e) =>
                setForm({ ...form, itemName: e.target.value })
              }
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Lost</option>
              <option>Found</option>
            </select>

            <button onClick={submitItem}>Submit</button>
          </div>
        )}

        {/* LIST */}
        <div className="lostfound-list">
          {items.map((item) => (
            <div key={item._id} className="lostfound-card">
              <h4>{item.itemName}</h4>
              <p>{item.description}</p>
              <p className="location">📍 {item.location}</p>

              {role === "management" ? (
                <select
                  value={item.status}
                  onChange={(e) =>
                    changeStatus(item._id, e.target.value)
                  }
                >
                  <option>Lost</option>
                  <option>Found</option>
                  <option>Claimed</option>
                </select>
              ) : (
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}