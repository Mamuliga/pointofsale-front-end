import axios from "axios";

export async function get(url) {
  return await axios.get("https://jsonplaceholder.typicode.com/todos/1");
}

export async function post(url, data) {
  return await axios.post(url, data);
}

export async function put(url, data) {
  return await axios.put(url, data);
}

export async function deleteReq(url, id) {
  return await axios.delete(url);
}
