// src/components/Supplier/Suppliers.js
import React, { useState, useEffect } from 'react';
import supplierService from '../../services/supplierService';

const Suppliers = ({ onEdit, onError, onSuccess }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch suppliers on component mount and when filters change
  useEffect(() => {
    fetchSuppliers();
  }, [currentPage, activeFilter]);

  // Fetch suppliers from API
  const fetchSuppliers = async () => {
    setLoading(true);
    
    try {
      console.log('🔄 Fetching suppliers...', { currentPage, activeFilter });
      
      // Prepare parameters for API call
      const params = {
        page: currentPage
      };
      
      if (activeFilter !== null) {
        params.active = activeFilter.toString();
      }
      
      console.log('📤 API parameters:', params);
      
      const response = await supplierService.getSuppliers(params);
      
      console.log('📥 API Response:', response);
      console.log('📦 Response data:', response.data);
      
      // Backend returns: { suppliers: [...], totalCount: x, currentPage: y }
      if (response && response.data) {
        if (response.data.suppliers && Array.isArray(response.data.suppliers)) {
          console.log('✅ Setting suppliers:', response.data.suppliers.length, 'items');
          setSuppliers(response.data.suppliers);
          setTotalCount(response.data.totalCount || 0);
        } else if (Array.isArray(response.data)) {
          // If response.data is directly an array
          console.log('✅ Setting suppliers directly:', response.data.length, 'items');
          setSuppliers(response.data);
          setTotalCount(response.data.length);
        } else {
          console.error('❌ Invalid response structure:', response.data);
          onError && onError('Dữ liệu trả về từ server không hợp lệ');
        }
      } else {
        console.error('❌ No response data');
        onError && onError('Không nhận được dữ liệu từ server');
      }
    } catch (err) {
      console.error('❌ Error fetching suppliers:', err);
      console.error('Error details:', err.response);
      
      if (err.response) {
        onError && onError(`Lỗi ${err.response.status}: ${err.response.data.message || 'Không thể tải dữ liệu'}`);
      } else if (err.request) {
        onError && onError('Không thể kết nối đến server. Vui lòng kiểm tra backend có đang chạy không.');
      } else {
        onError && onError(`Lỗi: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      fetchSuppliers();
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('🔍 Searching for:', searchTerm);
      
      const response = await supplierService.searchSuppliers(
        searchTerm, 
        activeFilter !== null ? activeFilter.toString() : null
      );
      
      console.log('🔍 Search results:', response);
      
      // Search endpoint returns array directly
      if (response && response.data && Array.isArray(response.data)) {
        setSuppliers(response.data);
        setTotalCount(response.data.length);
      } else {
        onError && onError('Không tìm thấy kết quả nào');
      }
    } catch (err) {
      console.error('❌ Search error:', err);
      onError && onError(`Lỗi tìm kiếm: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    fetchSuppliers();
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setActiveFilter(value === '' ? null : value === 'true');
    setCurrentPage(1);
  };

  // Toggle supplier active status
  const handleToggleStatus = async (id) => {
    try {
      console.log('🔄 Toggling status for supplier:', id);
      
      const response = await supplierService.toggleSupplierStatus(id);
      
      console.log('✅ Toggle response:', response);
      
      if (response && response.data && response.data.success) {
        console.log('✅ Status updated successfully');
        onSuccess && onSuccess('Cập nhật trạng thái thành công!');
        fetchSuppliers(); // Refresh the list
      } else {
        onError && onError(response.data.message || 'Không thể cập nhật trạng thái');
      }
    } catch (err) {
      console.error('❌ Toggle error:', err);
      onError && onError(`Lỗi cập nhật trạng thái: ${err.response?.data?.message || err.message}`);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này?')) {
      return;
    }
    
    try {
      console.log('🗑 Deleting supplier:', id);
      
      const response = await supplierService.deleteSupplier(id);
      
      console.log('✅ Delete response:', response);
      
      if (response && response.data && response.data.success) {
        console.log('✅ Supplier deleted successfully');
        onSuccess && onSuccess('Xóa nhà cung cấp thành công!');
        fetchSuppliers(); // Refresh the list
      } else {
        onError && onError(response.data.message || 'Không thể xóa nhà cung cấp');
      }
    } catch (err) {
      console.error('❌ Delete error:', err);
      onError && onError(`Lỗi xóa nhà cung cấp: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="suppliers-container">
      {/* Search and filters */}
      <div className="suppliers-controls">
        <div className="search-controls">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Tìm kiếm nhà cung cấp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" disabled={loading} className="search-btn">
                <span>🔍</span> Tìm kiếm
              </button>
              {searchTerm && (
                <button 
                  type="button"
                  onClick={handleClearSearch}
                  disabled={loading}
                  className="clear-btn"
                >
                  Xóa
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className="filter-controls">
          <select 
            value={activeFilter === null ? '' : activeFilter.toString()}
            onChange={handleFilterChange}
            disabled={loading}
            className="filter-select"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="true">Đang hoạt động</option>
            <option value="false">Ngừng hoạt động</option>
          </select>
        </div>
      </div>

      {/* Loading spinner */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Suppliers table */}
      {!loading && (
        <div className="table-container">
          <table className="suppliers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên nhà cung cấp</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Đánh giá</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>
                      <div className="supplier-name">
                        <strong>{supplier.name}</strong>
                        {supplier.contactPerson && (
                          <div className="contact-person">Người liên hệ: {supplier.contactPerson}</div>
                        )}
                      </div>
                    </td>
                    <td>{supplier.email}</td>
                    <td>{supplier.phoneNumber}</td>
                    <td>{supplier.address}</td>
                    <td>
                      {supplier.rating ? (
                        <div className="rating">
                          <span className="stars">
                            {'★'.repeat(supplier.rating)}{'☆'.repeat(5 - supplier.rating)}
                          </span>
                          <div className="rating-text">{supplier.rating}/5</div>
                        </div>
                      ) : (
                        <span className="no-rating">Chưa đánh giá</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${supplier.active ? 'status-active' : 'status-inactive'}`}>
                        {supplier.active ? "Đang hoạt động" : "Ngừng hoạt động"}
                      </span>
                    </td>
                    <td>
                      {supplier.createdDate ? new Date(supplier.createdDate).toLocaleDateString('vi-VN') : '-'}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit-btn" 
                          onClick={() => onEdit && onEdit(supplier)}
                          disabled={loading}
                          title="Chỉnh sửa"
                        >
                          ✏️
                        </button>
                        <button
                          className={`action-btn toggle-btn ${supplier.active ? 'toggle-off' : 'toggle-on'}`}
                          onClick={() => handleToggleStatus(supplier.id)}
                          disabled={loading}
                          title={supplier.active ? "Vô hiệu hóa" : "Kích hoạt"}
                        >
                          {supplier.active ? '🔒' : '🔓'}
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(supplier.id)}
                          disabled={loading}
                          title="Xóa"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    Không có dữ liệu nhà cung cấp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Pagination */}
      {!loading && (
        <div className="pagination-container">
          <div className="pagination-info">
            <span>Hiển thị {suppliers.length} / {totalCount} nhà cung cấp</span>
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              disabled={currentPage === 1 || loading}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Trang trước
            </button>
            <span className="pagination-current">
              Trang {currentPage}
            </span>
            <button
              className="pagination-btn"
              disabled={suppliers.length < 10 || loading}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Trang sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;