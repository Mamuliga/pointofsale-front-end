import http from "./http";

export async function getUserList() {
  return await http.get("/users", { limit: 20 });
}

export async function getCustomerList() {
  return await http.get("api/customers", { limit: 20 });
}
