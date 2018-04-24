import axios from 'axios';

export function getBooks(limit = 10, start = 0, order = 'asc', list = '') {
  const request = axios
    .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(res => {
      if (list) {
        return [...list, ...res.data];
      } else {
        return res.data;
      }
    });

  return {
    type: 'GET_BOOKS',
    payload: request
  };
}
