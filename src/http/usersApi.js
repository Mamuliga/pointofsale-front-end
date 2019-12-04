import http from "./http";

export async function getUserList() {
  return await http.get("/users", { limit: 20 });
}
