import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import ManagementDashboard from "./components/ManagementDashboard";
import ReportIssue from "./components/ReportIssue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/management" element={<ManagementDashboard />} />
        <Route path="/report" element={<ReportIssue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;