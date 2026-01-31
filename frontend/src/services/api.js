const API_URL = "https://hostel-issue-tracking-backend.onrender.com/api";

const getToken = () => localStorage.getItem("token");

/* ================= AUTH ================= */
export const login = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

/* ================= ISSUES ================= */
export const getIssues = async () => {
  const res = await fetch(`${API_URL}/issues`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};

export const createIssue = async (data) => {
  const res = await fetch(`${API_URL}/issues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateIssueStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/issues/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ status })
  });
  return res.json();
};

/* ================= ANNOUNCEMENTS ================= */
export const getAnnouncements = async () => {
  const res = await fetch(`${API_URL}/announcements`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};

export const createAnnouncement = async (data) => {
  const res = await fetch(`${API_URL}/announcements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

/* ================= LOST & FOUND ================= */
export const getLostFound = async () => {
  const res = await fetch(`${API_URL}/lost-found`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};

export const createLostFound = async (data) => {
  const res = await fetch(`${API_URL}/lost-found`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateLostFoundStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/lost-found/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ status })
  });
  return res.json();
};