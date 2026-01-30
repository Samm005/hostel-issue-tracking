import { useEffect, useState } from "react";
import { getIssues, updateIssueStatus } from "../services/api";
import IssueCard from "./IssueCard";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard";

function ManagementDashboard() {
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "management") {
      navigate("/");
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
  <div className="dashboard-page">
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Management Dashboard</h1>
        <p>Review and resolve reported hostel issues</p>
      </div>

      <div className="dashboard-section">
        {issues.length === 0 && (
          <div className="empty-box">No issues reported.</div>
        )}

        <div className="issues-grid">
          {issues.map((issue) => (
            <div className="issue-wrapper" key={issue._id}>
              <IssueCard
                issue={issue}
                onStatusChange={handleStatusChange}
                isManagement={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default ManagementDashboard;
