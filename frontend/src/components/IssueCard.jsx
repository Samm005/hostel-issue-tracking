function IssueCard({ issue }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "6px",
        backgroundColor: "#1e1e1e",
        color: "#fff"
      }}
    >
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

      <p>
        <strong>Status:</strong> {issue.status}
      </p>
    </div>
  );
}

export default IssueCard;