import http from './http';

export async function getCashupList() {
  return await http.get('/cashbooks', { limit: 20 });
}

export async function getCashupById(id) {
  return await http.get(`./cashbooks/${id}`);
}

export async function updateCashupById(id, body) {
  return await http.put(`./cashbooks/${id}`, body);
}

export async function createCashup(body) {
  return await http.post('./cashbooks', body);
}

export async function deleteCashup(id) {
  return await http.deleteById('./cashbooks', id);
}
