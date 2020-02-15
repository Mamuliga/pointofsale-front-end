import http from "./http";

export async function getCustomerList() {
  return await http.get("api/customers", { limit: 20 });
}
