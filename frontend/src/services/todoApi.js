import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getTodos = ({ status, search, page, limit, sortBy, sortOrder } = {}) => {
  const params = {};
  if (status) params.status = status;
  if (search) params.search = search;
  if (page) params.page = page;
  if (limit) params.limit = limit;
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.sortOrder = sortOrder;
  return axios.get(API_URL, { params });
};

export const createTodo = (data) => axios.post(API_URL, data);

export const updateTodo = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const updateTodoStatus = (id, status) =>
  axios.patch(`${API_URL}/${id}/status`, { status });

export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
