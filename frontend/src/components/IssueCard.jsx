function IssueCard({ issue, onStatusChange, isManagement }) {
  return (
    <div>
      <h4>{issue.title}</h4>

      <p>
        <strong>Description:</strong> {issue.description}
      </p>

      <p>
        <strong>Category:</strong> {issue.category}
      </p>

      <p>
        <strong>Priority:</strong> {issue.priority}
      </p>

      {isManagement ? (
        <div>
          <label>Status: </label>
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
        <p>
          <strong>Status:</strong> {issue.status}
        </p>
      )}
    </div>
  );
}

export default IssueCard;