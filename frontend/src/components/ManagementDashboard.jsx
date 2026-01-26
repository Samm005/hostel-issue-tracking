import { useEffect, useState } from "react";
import { getIssues, updateIssueStatus } from "../services/api";
import IssueCard from "./IssueCard";
import Navbar from "./Navbar";

function ManagementDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getIssues(token)
      .then((data) => {
        setIssues(data);
      })
      .catch((err) => {
        console.error("Error fetching issues:", err);
      });
  }, []);

  // 🔹 THIS IS THE KEY FUNCTION
  const handleStatusChange = async (issueId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      const updatedIssue = await updateIssueStatus(
        issueId,
        newStatus,
        token
      );

      // ✅ update UI state (THIS is what was missing earlier)
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
    <>
      <Navbar role="management" />

      <div>
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
    </>
  );
}

export default ManagementDashboard;