import http from "./http";

export async function getCustomerList() {
  return await http.get("/customers", { limit: 20 });
}
