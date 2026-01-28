import "./IssueCard.css";

function IssueCard({ issue, onStatusChange, isManagement }) {
  return (
    <div className="issue-card">
      <h4 className="issue-title">{issue.title}</h4>

      <p className="issue-text">
        <strong>Description:</strong> {issue.description}
      </p>

      <div className="issue-meta">
        <span>
          <strong>Category:</strong> {issue.category}
        </span>
        <span className={`priority ${issue.priority.toLowerCase()}`}>
          {issue.priority}
        </span>
      </div>

      {isManagement ? (
        <div className="status-control">
          <label>Status</label>
          <select
            value={issue.status}
            onChange={(e) =>
              onStatusChange(issue._id, e.target.value)
            }
          >
            <option value="Reported">Reported</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      ) : (
        <p className="issue-status">
          <strong>Status:</strong> {issue.status}
        </p>
      )}
    </div>
  );
}

export default IssueCard;
