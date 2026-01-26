import { useEffect, useState } from "react";
import { getIssues } from "../services/api";
import IssueCard from "./IssueCard";

function StudentDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getIssues(token).then(setIssues);
  }, []);

  return (
    <div>
      <h2>Student Dashboard</h2>

      {issues.length === 0 && <p>No issues reported yet.</p>}

      {issues.map((issue) => (
        <IssueCard key={issue._id} issue={issue} />
      ))}
    </div>
  );
}

export default StudentDashboard;
