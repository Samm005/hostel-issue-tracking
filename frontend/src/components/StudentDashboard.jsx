import { useEffect, useState } from "react";
import { getIssues } from "../services/api";
import IssueCard from "./IssueCard";
import "./StudentDashboard.css";

function StudentDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getIssues(token).then(setIssues);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Track and manage your hostel issues</p>
        </header>

        <section className="dashboard-section">
          <h3 className="section-title">Your Reported Issues</h3>

          {issues.length === 0 ? (
            <div className="empty-box">
              No issues reported yet.
            </div>
          ) : (
            <div className="issues-grid">
              {issues.map((issue) => (
                <div className="issue-wrapper" key={issue._id}>
                  <IssueCard issue={issue} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default StudentDashboard;
