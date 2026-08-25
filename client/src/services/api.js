import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
};

// Transaction API calls
export const transactionAPI = {
  getAll: (startDate, endDate, category) =>
    api.get('/transactions', { params: { startDate, endDate, category } }),
  create: (transaction) =>
    api.post('/transactions', transaction),
  update: (id, transaction) =>
    api.put(`/transactions/${id}`, transaction),
  delete: (id) =>
    api.delete(`/transactions/${id}`),
};

// Budget API calls
export const budgetAPI = {
  getAll: (month, year) =>
    api.get('/budgets', { params: { month, year } }),
  create: (budget) =>
    api.post('/budgets', budget),
  delete: (id) =>
    api.delete(`/budgets/${id}`),
};

export default api;
