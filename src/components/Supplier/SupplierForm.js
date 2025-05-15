// src/components/Supplier/SupplierForm.js
import React, { useState, useEffect } from 'react';

const SupplierForm = ({ show, onHide, onSubmit, supplier = null, title, loading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    contactPerson: '',
    taxCode: '',
    paymentTerms: '',
    rating: 5,
    active: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (supplier && show) {
      setFormData({
        name: supplier.name || '',
        email: supplier.email || '',
        phoneNumber: supplier.phoneNumber || '',
        address: supplier.address || '',
        contactPerson: supplier.contactPerson || '',
        taxCode: supplier.taxCode || '',
        paymentTerms: supplier.paymentTerms || '',
        rating: supplier.rating || 5,
        active: supplier.active !== undefined ? supplier.active : true
      });
    } else if (show && !supplier) {
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        contactPerson: '',
        taxCode: '',
        paymentTerms: '',
        rating: 5,
        active: true
      });
    }
    setErrors({});
  }, [supplier, show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên nhà cung cấp là bắt buộc';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Số điện thoại là bắt buộc';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleHide = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      contactPerson: '',
      taxCode: '',
      paymentTerms: '',
      rating: 5,
      active: true
    });
    setErrors({});
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container supplier-form-modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-btn" onClick={handleHide}>
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="supplier-form">
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">
                  Tên nhà cung cấp <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Nhập tên nhà cung cấp"
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="Nhập email"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Số điện thoại <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={errors.phoneNumber ? 'error' : ''}
                  placeholder="Nhập số điện thoại"
                />
                {errors.phoneNumber && (
                  <div className="error-message">{errors.phoneNumber}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contactPerson">
                  Người liên hệ
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Nhập tên người liên hệ"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Địa chỉ <span className="required">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
                placeholder="Nhập địa chỉ"
              />
              {errors.address && (
                <div className="error-message">{errors.address}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="taxCode">
                  Mã số thuế
                </label>
                <input
                  type="text"
                  id="taxCode"
                  name="taxCode"
                  value={formData.taxCode}
                  onChange={handleChange}
                  placeholder="Nhập mã số thuế"
                />
              </div>

              <div className="form-group">
                <label htmlFor="paymentTerms">
                  Điều kiện thanh toán
                </label>
                <input
                  type="text"
                  id="paymentTerms"
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  placeholder="Nhập điều kiện thanh toán"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rating">
                  Đánh giá
                </label>
                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                >
                  <option value={1}>1 ⭐</option>
                  <option value={2}>2 ⭐⭐</option>
                  <option value={3}>3 ⭐⭐⭐</option>
                  <option value={4}>4 ⭐⭐⭐⭐</option>
                  <option value={5}>5 ⭐⭐⭐⭐⭐</option>
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Trạng thái hoạt động
                </label>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleHide} 
              disabled={loading}
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : (supplier ? 'Cập nhật' : 'Thêm mới')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;