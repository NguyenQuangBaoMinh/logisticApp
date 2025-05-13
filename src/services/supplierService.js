// src/services/supplierService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/suppliers';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const supplierService = {
  // Get all suppliers with filters
  getSuppliers: (params = {}) => {
    return api.get('', { params });
  },

  // Get active suppliers only
  getActiveSuppliers: () => {
    return api.get('/active');
  },

  // Search suppliers by name
  searchSuppliers: (name, active = null, sort = null) => {
    const params = { name };
    if (active !== null) params.active = active;
    if (sort !== null) params.sort = sort;
    return api.get('/search', { params });
  },

  // Get supplier by ID
  getSupplierById: (id) => {
    return api.get(`/${id}`);
  },

  // Create new supplier
  createSupplier: (supplier) => {
    return api.post('', supplier);
  },

  // Update supplier
  updateSupplier: (id, supplier) => {
    return api.put(`/${id}`, supplier);
  },

  // Delete supplier
  deleteSupplier: (id) => {
    return api.delete(`/${id}`);
  },

  // Toggle supplier active status
  toggleSupplierStatus: (id) => {
    return api.put(`/${id}/toggle-active`);
  },

  // Update supplier rating
  updateSupplierRating: (id, rating) => {
    return api.put(`/${id}/rating`, { rating });
  },

  // Get suppliers count
  getSuppliersCount: () => {
    return api.get('/count');
  }
};

export default supplierService;