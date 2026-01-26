import { useEffect, useState } from "react";
import { getIssues, updateIssueStatus } from "../services/api";
import IssueCard from "./IssueCard";
import { useNavigate } from "react-router-dom";

function ManagementDashboard() {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // 👈 assuming you store role

    // 🔐 auth + role guard
    if (!token || role !== "management") {
      navigate("/"); // redirect to login
      return;
    }

    getIssues(token)
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error fetching issues:", err));
  }, [navigate]);

  const handleStatusChange = async (issueId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      const updatedIssue = await updateIssueStatus(
        issueId,
        newStatus,
        token
      );

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue._id === issueId ? updatedIssue : issue
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Management Dashboard</h2>

      {issues.length === 0 && <p>No issues reported.</p>}

      {issues.map((issue) => (
        <IssueCard
          key={issue._id}
          issue={issue}
          onStatusChange={handleStatusChange}
          isManagement={true}
        />
      ))}
    </div>
  );
}

export default ManagementDashboard;