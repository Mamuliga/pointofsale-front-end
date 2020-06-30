import http from './http';

export async function getCreditbookList() {
  return await http.get('/creditbooks', { limit: 20 });
}

export async function getFilteredCreditbooks(startDate, endDate) {
  return await http.get(
    `/creditbooks?startDate=${startDate}&endDate=${endDate}`,
    { limit: 20 }
  );
}

export async function getCreditbookById(id) {
  return await http.get(`./creditbooks/${id}`);
}

export async function updateCreditbookById(id, body) {
  return await http.put(`./creditbooks/${id}`, body);
}

export async function createCreditbook(body) {
  return await http.post('./creditbooks', body);
}

export async function deleteCreditbook(id) {
  return await http.deleteById('./creditbooks', id);
}
