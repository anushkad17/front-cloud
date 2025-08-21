import api from "./http";

export async function fetchMe() {
  const { data } = await api.get("/user/me");
  return data;
}
