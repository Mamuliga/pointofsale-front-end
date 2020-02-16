import http from "./http";

export async function getCustomerList() {
  return await http.get("/customers", { limit: 20 });
}

export async function getCustomerById(id) {
  return await http.get(`./customers/${id}`);
}
