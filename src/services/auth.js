import api from "./http";

export async function login(username, password) {
  const { data } = await api.post("/auth/login", { username, password });
  if (data?.token) localStorage.setItem("token", data.token);
  return data;
}

export async function registerUser(payload) {
  const { data } = await api.post("/auth/register", payload, {
    transformResponse: r => r,
  });
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthed() {
  return !!localStorage.getItem("token");
}

// 🔹 New: Fetch current user profile
export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");
  console.log("Fetched current user:", data);
  return data;
}


