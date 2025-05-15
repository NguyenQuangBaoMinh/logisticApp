// src/services/supplierService.js
import api from '../configs/Apis';

const supplierService = {
  // Get all suppliers with filters
  getSuppliers: (params = {}) => {
    console.log('Service: getSuppliers with params:', params);
    return api.get('/suppliers', { params });
  },

  // Get active suppliers only
  getActiveSuppliers: () => {
    console.log('Service: getActiveSuppliers');
    return api.get('/suppliers/active');
  },

  // Search suppliers by name
  searchSuppliers: (name, active = null, sort = null) => {
    console.log('Service: searchSuppliers', { name, active, sort });
    const params = { name };
    if (active !== null) params.active = active;
    if (sort !== null) params.sort = sort;
    return api.get('/suppliers/search', { params });
  },

  // Get supplier by ID
  getSupplierById: (id) => {
    console.log('Service: getSupplierById', id);
    return api.get(`/suppliers/${id}`);
  },

  // Create new supplier
  createSupplier: (supplier) => {
    console.log('Service: createSupplier', supplier);
    return api.post('/suppliers', supplier);
  },

  // Update supplier
  updateSupplier: (id, supplier) => {
    console.log('Service: updateSupplier', id, supplier);
    return api.put(`/suppliers/${id}`, supplier);
  },

  // Delete supplier
  deleteSupplier: (id) => {
    console.log('Service: deleteSupplier', id);
    return api.delete(`/suppliers/${id}`);
  },

  // Toggle supplier active status
  toggleSupplierStatus: (id) => {
    console.log('Service: toggleSupplierStatus', id);
    return api.put(`/suppliers/${id}/toggle-active`);
  },

  // Update supplier rating
  updateSupplierRating: (id, rating) => {
    console.log('Service: updateSupplierRating', id, rating);
    return api.put(`/suppliers/${id}/rating`, { rating });
  },

  // Get suppliers count
  getSuppliersCount: () => {
    console.log('Service: getSuppliersCount');
    return api.get('/suppliers/count');
  }
};

export default supplierService;