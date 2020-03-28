import http from './http';

export async function getItemList() {
  return await http.get('/items', { limit: 20 });
}

export async function getItemById(id) {
  return await http.get(`./items/${id}`);
}

export async function updateItemById(id, body) {
  return await http.put(`./items/${id}`, body);
}

export async function createItem(body) {
  return await http.post('./items', body);
}

export async function deleteItem(id) {
  return await http.deleteById('./items', id);
}
