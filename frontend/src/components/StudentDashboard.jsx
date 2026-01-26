import { useEffect, useState } from "react";
import { getIssues } from "../services/api";
import IssueCard from "./IssueCard";

function StudentDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    getIssues(token)
      .then((data) => {
        setIssues(data);
      })
      .catch((err) => {
        console.error("Failed to fetch issues", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Dashboard</h2>

      {loading && <p>Loading issues...</p>}

      {!loading && issues.length === 0 && (
        <p>No issues reported yet.</p>
      )}

      {!loading &&
        issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
    </div>
  );
}

export default StudentDashboard;