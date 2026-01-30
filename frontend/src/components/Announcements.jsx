import { useEffect, useState } from "react";
import {
  getAnnouncements,
  createAnnouncement
} from "../services/api";
import "./Announcements.css";

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
    <div className="announcements-page">
      <div className="announcements-container">
        <h2 className="announcements-title">Announcements</h2>

        {role === "management" && (
          <div className="announcement-form">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
            <textarea
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
            <button onClick={submitAnnouncement}>Post Announcement</button>
          </div>
        )}

        <div className="announcement-list">
          {announcements.map((a) => (
            <div key={a._id} className="announcement-card">
              <h4>{a.title}</h4>
              <p>{a.message}</p>
              <span className="announcement-target">
                🎯 {a.target}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}