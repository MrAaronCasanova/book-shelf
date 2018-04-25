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

export function getBookWithReviewer(id) {
  const request = axios.get(`/api/book?id=${id}`);
  return dispatch => {
    request.then(({ data }) => {
      let book = data;
      axios.get(`/api/reviewer?id=${book.ownerId}`).then(({ data }) => {
        let response = {
          book,
          reviewer: data
        };
        dispatch({
          type: 'GET_BOOK_W_REVIEWER',
          payload: response
        });
      });
    });
  };
}

export function clearBookWithReviewer() {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {
      book: {},
      reviewer: {}
    }
  };
}

// * --------- User --------- * //

export function loginUser({ email, password }) {
  const request = axios
    .post('/api/login', { email, password })
    .then(res => res.data);

  return {
    type: 'USER_LOGIN',
    payload: request
  };
}
