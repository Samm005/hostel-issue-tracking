import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Header */}
        <div className="logo-section">
          <div className="logo-circle">SHM</div>
          <h2>SMART HOSTEL MANAGEMENT</h2>
          <p>EFFORTLESS HOSTEL MANAGEMENT</p>
        </div>

        {/* Form */}
        <input
          className="login-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            className="login-input"
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="eye" onClick={() => setShow(!show)}>👁</span>
        </div>

        <button className="login-btn">Login</button>

        <p className="signup-text">
          Don't have an account <span>Create account</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
