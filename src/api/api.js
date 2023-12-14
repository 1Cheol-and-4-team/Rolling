import { BASE_URL, ENDPOINT } from '@/api/endpoint';
import axios from 'axios';

async function api(type, method, path, postData, limit, offset) {
  const endpoint = ENDPOINT[type][method];
  let url =
    typeof endpoint === 'function'
      ? BASE_URL + endpoint(path)
      : BASE_URL + endpoint;

  if (limit) {
    url += `?limit=${limit}`;
  }
  if (offset) {
    url += `?offset=${offset}`;
  }

  try {
    switch (method) {
      case 'GET': {
        const response = await axios.get(url);
        return response.data;
      }
      case 'POST': {
        const response = await axios.post(url, postData);
        return response.data;
      }
      case 'DELETE': {
        const response = await axios.delete(url);
        return response.data;
      }
      default:
        throw new Error('Method를 입력해!!!!');
    }
  } catch (error) {
    throw new Error('호출에 실패!!!!!!!!');
  }
}

export default api;
