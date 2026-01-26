import { Link, useNavigate } from "react-router-dom";

function Navbar({ role }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav>
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

      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;