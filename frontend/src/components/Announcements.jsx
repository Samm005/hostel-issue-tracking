import { useEffect, useState } from "react";
import {
  getAnnouncements,
  createAnnouncement
} from "../services/api";

export default function Announcements() {
  const role = localStorage.getItem("role");

  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
    target: "All"
  });

  const loadAnnouncements = async () => {
    const data = await getAnnouncements();
    setAnnouncements(data);
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const submitAnnouncement = async () => {
    await createAnnouncement(form);
    setForm({ title: "", message: "", target: "All" });
    loadAnnouncements();
  };

  return (
    <div>
      <h2>Announcements</h2>

      {role === "management" && (
        <>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          <input
            placeholder="Message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />
          <input
            placeholder="Target (All / Block A etc)"
            value={form.target}
            onChange={(e) =>
              setForm({ ...form, target: e.target.value })
            }
          />
          <button onClick={submitAnnouncement}>Post</button>
          <hr />
        </>
      )}

      {announcements.map((a) => (
        <div key={a._id}>
          <h4>{a.title}</h4>
          <p>{a.message}</p>
          <small>Target: {a.target}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}