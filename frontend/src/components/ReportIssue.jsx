import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIssue } from "../services/api";
import Navbar from "./Navbar";

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
    <>
      <Navbar role="student" />

      <div>
        <h2>Report Issue</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <br />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <br />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <br />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ReportIssue;
