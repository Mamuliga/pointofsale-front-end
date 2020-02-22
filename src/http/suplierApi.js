import http from "./http";

export async function getSuplierList() {
  return await http.get("/supliers", { limit: 20 });
}

export async function getSuplierById(id) {
  return await http.get(`./supliers/${id}`);
}

export async function updateSuplierById(id, body) {
  return await http.put(`./supliers/${id}`, body);
}

export async function createSuplier(body) {
  return await http.post("./supliers", body);
}

export async function deleteSuplier(id) {
  return await http.deleteById("./supliers", id);
}
