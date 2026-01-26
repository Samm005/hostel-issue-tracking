const API_URL = "http://localhost:5000/api";

export const login = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getIssues = async (token) => {
  const res = await fetch(`${API_URL}/issues`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const createIssue = async (data, token) => {
  const res = await fetch(`${API_URL}/issues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};