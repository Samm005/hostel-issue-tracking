import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./components/Login";
import StudentDashboard from "./components/StudentDashboard";
import ManagementDashboard from "./components/ManagementDashboard";
import ReportIssue from "./components/ReportIssue";
import LostFound from "./components/LostFound";
import Announcements from "./components/Announcements";
import Navbar from "./components/Navbar";

function AppLayout() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/management" element={<ManagementDashboard />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
