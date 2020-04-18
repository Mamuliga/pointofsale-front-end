import axios from 'axios';
import env from '../config/env';
import { AUTH_LOCAL_STORAGE } from '../utilities/constants';

async function request({ method, url, body, params }) {
  const respond = await axios.request({
    baseURL: env.apiUrl,
    timeout: 5000,
    url,
    method,
    data: body,
    params,
    headers: {
      Authorization:
        JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE)).token || null,
    },
  });
  if (env.NODE_ENV === 'development') console.log('API REQUEST', respond);
  return respond;
}

export default {
  get: async function (url, queryParams) {
    return await request({ method: 'GET', url, params: queryParams });
  },
  post: async function (url, body) {
    return await request({ method: 'POST', url, body });
  },
  put: async function (url, body) {
    return await request({ method: 'PUT', url, body });
  },
  delete: async function (url, queryParams) {
    return await request({ method: 'DELETE', url, params: queryParams });
  },
  deleteById: async function (url, id) {
    return await request({ method: 'DELETE', url: `${url}/${id}` });
  },
};
