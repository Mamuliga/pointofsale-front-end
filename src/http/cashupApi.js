import http from './http';

export async function getCashupList() {
  return await http.get('/cashups', { limit: 20 });
}

export async function getCashupById(id) {
  return await http.get(`./cashups/${id}`);
}

export async function updateCashupById(id, body) {
  return await http.put(`./cashups/${id}`, body);
}

export async function createCashup(body) {
  return await http.post('./cashups', body);
}

export async function deleteCashup(id) {
  return await http.deleteById('./cashups', id);
}
