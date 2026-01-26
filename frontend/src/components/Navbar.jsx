import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // If not logged in → don’t show navbar
  if (!role) return null;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      {role === "student" && (
        <>
          <Link to="/student">Dashboard</Link>{" | "}
          <Link to="/report">Report Issue</Link>{" | "}
        </>
      )}

      {role === "management" && (
        <>
          <Link to="/management">Dashboard</Link>{" | "}
        </>
      )}

      <Link to="/announcements">Announcements</Link>{" | "}
      <Link to="/lost-found">Lost & Found</Link>{" | "}
      <button onClick={logout}>Logout</button>
    </div>
  );
}