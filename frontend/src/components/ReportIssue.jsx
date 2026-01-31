import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIssue } from "../services/api";
import "./ReportIssue.css";

function ReportIssue() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Low"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await createIssue(form, token);
      alert("Issue reported");
      navigate("/student");
    } catch (err) {
      alert("Failed to report issue");
    }
  };

   return (
    <div className="report-page">
      <div className="report-card">
        <h2>Report an Issue</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Issue Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe the issue"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category (e.g. Hostel, Mess)"
            value={form.category}
            onChange={handleChange}
            required
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button type="submit">Submit Issue</button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;