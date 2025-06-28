import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);

// Products
export const getProducts = () => api.get('/admin/products');
export const getProductById = (id) => api.get(`/admin/products/${id}`);

// User
export const getUserProfile = () => api.get('/users/me');
export const updateUserProfile = (profileData) => api.put('/users/me', profileData);

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrders = () => api.get('/users/orders');

// Categories
export const getCategories = () => api.get('/catogries');

export default api;