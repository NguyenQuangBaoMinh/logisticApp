// src/components/Supplier/SupplierManagement.js
import React, { useState, useEffect } from 'react';
import './Supplier.css';
import Suppliers from './Suppliers';
import SupplierForm from './SupplierForm';
import supplierService from '../../services/supplierService';

const SupplierManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle create supplier
  const handleCreateSupplier = () => {
    setSelectedSupplier(null);
    setShowForm(true);
  };

  // Handle edit supplier
  const handleEditSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setShowForm(true);
  };

  // Handle form submit
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      if (selectedSupplier) {
        // Update existing supplier
        const response = await supplierService.updateSupplier(selectedSupplier.id, formData);
        if (response.data) {
          setSuccess('Cập nhật nhà cung cấp thành công!');
        }
      } else {
        // Create new supplier
        const response = await supplierService.createSupplier(formData);
        if (response.data) {
          setSuccess('Thêm nhà cung cấp thành công!');
        }
      }
      
      setShowForm(false);
      setRefreshKey(prev => prev + 1); // Trigger refresh of supplier list
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi xử lý dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
    setSelectedSupplier(null);
    setError(null);
  };

  return (
    <div className="supplier-management">
      {/* Header */}
      <div className="page-header">
        <h1>Quản lý Nhà Cung Cấp</h1>
        <button 
          className="btn btn-primary"
          onClick={handleCreateSupplier}
        >
          <span className="btn-icon">➕</span>
          Thêm Nhà Cung Cấp
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="alert alert-success">
          <span>✅</span> {success}
        </div>
      )}
      
      {error && (
        <div className="alert alert-error">
          <span>❌</span> {error}
        </div>
      )}

      {/* Suppliers Table */}
      <Suppliers 
        key={refreshKey}
        onEdit={handleEditSupplier}
        onError={setError}
        onSuccess={setSuccess}
      />

      {/* Supplier Form Modal */}
      {showForm && (
        <SupplierForm
          show={showForm}
          onHide={handleFormClose}
          onSubmit={handleFormSubmit}
          supplier={selectedSupplier}
          title={selectedSupplier ? 'Chỉnh sửa Nhà Cung Cấp' : 'Thêm Nhà Cung Cấp Mới'}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SupplierManagement;