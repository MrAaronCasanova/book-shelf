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

export function addBook(book) {
  const request = axios.post('/api/book', book).then(res => res.data);

  return {
    type: 'ADD_BOOK',
    payload: request
  };
}

export function clearNewBook() {
  return {
    type: 'CLEAR_NEW_BOOK',
    payload: {}
  };
}

export function getUserPosts(userId) {
  const request = axios
    .get(`/api/user_posts?user=${userId}`)
    .then(res => res.data);
  return {
    type: 'GET_USER_POSTS',
    payload: request
  };
}

export function getBook(id) {
  const request = axios.get(`/api/book?id=${id}`).then(res => res.data);
  return {
    type: 'GET_BOOK',
    payload: request
  };
}

export function updateBook(data) {
  const request = axios.post(`/api/update_book`, data).then(res => res.data);
  return {
    type: 'UPDATE_BOOK',
    payload: request
  };
}

export function deleteBook(id) {
  const request = axios
    .delete(`/api/delete_book?id=${id}`)
    .then(res => res.data);
  return {
    type: 'DELETE_BOOK',
    payload: request
  };
}

export function clearBook() {
  return {
    type: 'CLEAR_BOOK',
    payload: {
      book: null,
      updateBook: false,
      postDeleted: false
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

export function auth() {
  const request = axios.get('/api/auth').then(res => res.data);
  return {
    type: 'USER_AUTH',
    payload: request
  };
}
