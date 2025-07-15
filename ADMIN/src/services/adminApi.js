import axios from 'axios';
import { getAdminToken } from '../utils/adminAuth';

const API_URL = import.meta.env.VITE_API_URL;

const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Admin Auth =====
export const adminLogin = (credentials) => adminApi.post('/auth/admin-login', credentials);

// ===== Admin Categories =====
export const createCategory = (categoryData) => adminApi.post('/categories', categoryData);

// ===== Admin Products =====
export const createProduct = (productData) => adminApi.post('/admin/products', productData);
export const updateProduct = (productId, updatedData) => adminApi.put(`/admin/products/${productId}`, updatedData);
export const deleteProduct = (productId) => adminApi.delete(`/admin/products/${productId}`);

// ===== Admin Orders =====
export const getAllOrders = () => adminApi.get('/admin/orders');
export const updateOrderStatus = (orderId, statusData) => adminApi.put(`/admin/orders/${orderId}`, statusData);

// ===== Admin Dashboard (to be implement) =====
export const getDashboardStats = () => adminApi.get('/admin/stats');
export const getRecentOrders = () => adminApi.get('/admin/orders/recent');
export const getTopSellingProducts = () => adminApi.get('/admin/products/top-selling');

// ===== Admin Users Management =====
export const getAllUsers = () => adminApi.get('/admin/users');
export const toggleUserAccess = (userId) => adminApi.put(`/admin/users/${userId}`);

export default adminApi;