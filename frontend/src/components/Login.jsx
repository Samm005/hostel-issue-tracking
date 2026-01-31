import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      if (!data.token) return alert("Invalid credentials");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      navigate(data.role === "student" ? "/student" : "/management");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">

        <div className="auth-left">

          {/* LOGO + TEXT */}
          <div className="brand-header">
            <div className="brand-logo">SHM</div>

            <div className="brand-text">
              <h1>WELCOME</h1>
              <p> HOSTEL ISSUE MANAGEMENT</p>
            </div>
          </div>

          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <div className="auth-right">
          <h2>Sign in</h2>
          <p className="subtext">Please enter your credentials</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Sign in</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
