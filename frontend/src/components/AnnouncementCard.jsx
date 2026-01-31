function AnnouncementCard({ title, message, target }) {
  return (
    <div>
      <h4>{title}</h4>
      <p>{message}</p>
      <small>Target: {target}</small>
      <hr />
    </div>
  );
}

export default AnnouncementCard;