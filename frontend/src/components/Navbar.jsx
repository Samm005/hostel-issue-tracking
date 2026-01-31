import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!role) return null;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="nav-wrapper">
      <div className={`nav-pill ${open ? "open" : ""}`}>
        <div className="nav-left">
          <div className="nav-logo">SHM</div>
        </div>

        <div className="nav-links">
          {role === "student" && (
            <>
              <Link to="/student">Dashboard</Link>
              <Link to="/report">Report</Link>
            </>
          )}

          {role === "management" && (
            <Link to="/management">Dashboard</Link>
          )}

          <Link to="/announcements">Announcements</Link>
          <Link to="/lost-found">Lost & Found</Link>
        </div>

        <div className="nav-right">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>

          <button
            className="hamburger"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
