import { useEffect, useState } from "react";
import {
  getLostFound,
  createLostFound,
  updateLostFoundStatus
} from "../services/api";

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
    <div>
      <h2>Lost & Found</h2>

      {/* STUDENT FORM */}
      {role === "student" && (
        <>
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
        </>
      )}

      <hr />

      {/* LIST FOR BOTH */}
      {items.map((item) => (
        <div key={item._id}>
          <p><b>{item.itemName}</b></p>
          <p>{item.description}</p>
          <p>Location: {item.location}</p>

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
            <p>Status: {item.status}</p>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}