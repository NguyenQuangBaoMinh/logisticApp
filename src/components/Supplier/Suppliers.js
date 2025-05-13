// src/components/Supplier/Suppliers.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Card, Alert, Modal, Spinner, Badge } from 'react-bootstrap';
import { supplierService } from '../../services/supplierService';
import SupplierForm from './SupplierForm';
import SupplierFilter from './SupplierFilter';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Search and filter states
  const [searchName, setSearchName] = useState('');
  const [filterActive, setFilterActive] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, [currentPage, searchName, filterActive, sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage
      };
      
      if (searchName) params.name = searchName;
      if (filterActive) params.active = filterActive;
      if (sortBy) params.sort = sortBy;
      
      const response = await supplierService.getSuppliers(params);
      setSuppliers(response.data.suppliers);
      setTotalCount(response.data.totalCount);
      setError(null);
    } catch (err) {
      setError('Lỗi khi tải danh sách nhà cung cấp');
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchSuppliers();
  };

  const handleCreateSupplier = async (supplier) => {
    try {
      const response = await supplierService.createSupplier(supplier);
      if (response.data.success) {
        setShowAddModal(false);
        fetchSuppliers();
        setError(null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi tạo nhà cung cấp');
    }
  };

  const handleUpdateSupplier = async (supplier) => {
    try {
      const response = await supplierService.updateSupplier(selectedSupplier.id, supplier);
      if (response.data.success) {
        setShowEditModal(false);
        setSelectedSupplier(null);
        fetchSuppliers();
        setError(null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi cập nhật nhà cung cấp');
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      const response = await supplierService.deleteSupplier(selectedSupplier.id);
      if (response.data.success) {
        setShowDeleteModal(false);
        setSelectedSupplier(null);
        fetchSuppliers();
        setError(null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi xóa nhà cung cấp');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await supplierService.toggleSupplierStatus(id);
      if (response.data.success) {
        fetchSuppliers();
        setError(null);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Lỗi khi thay đổi trạng thái');
    }
  };

  const getRatingStars = (rating) => {
    if (!rating) return '-';
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (loading && suppliers.length === 0) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">Quản lý nhà cung cấp</h2>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {/* Search and Filter */}
      <Card className="mb-4">
        <Card.Body>
          <SupplierFilter
            searchName={searchName}
            setSearchName={setSearchName}
            filterActive={filterActive}
            setFilterActive={setFilterActive}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onSearch={handleSearch}
            loading={loading}
          />
        </Card.Body>
      </Card>

      {/* Action Buttons */}
      <Row className="mb-3">
        <Col>
          <Button 
            variant="primary" 
            onClick={() => setShowAddModal(true)}
          >
            <i className="fas fa-plus"></i> Thêm nhà cung cấp
          </Button>
        </Col>
        <Col xs="auto">
          <small className="text-muted">
            Hiển thị {suppliers.length} / {totalCount} nhà cung cấp
          </small>
        </Col>
      </Row>

      {/* Suppliers Table */}
      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead className="table-dark">
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Địa chỉ</th>
                <th>Người liên hệ</th>
                <th>Trạng thái</th>
                <th>Đánh giá</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier.id}>
                  <td><strong>{supplier.name}</strong></td>
                  <td>{supplier.email || '-'}</td>
                  <td>{supplier.phoneNumber || '-'}</td>
                  <td>{supplier.address || '-'}</td>
                  <td>{supplier.contactPerson || '-'}</td>
                  <td>
                    <Badge bg={supplier.active ? 'success' : 'secondary'}>
                      {supplier.active ? 'Hoạt động' : 'Không hoạt động'}
                    </Badge>
                  </td>
                  <td>{getRatingStars(supplier.rating)}</td>
                  <td>{formatDate(supplier.createdDate)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setShowEditModal(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        size="sm"
                        variant={supplier.active ? "outline-warning" : "outline-success"}
                        onClick={() => handleToggleStatus(supplier.id)}
                        title={supplier.active ? "Tạm dừng" : "Kích hoạt"}
                      >
                        <i className={`fas fa-${supplier.active ? 'pause' : 'play'}`}></i>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setShowDeleteModal(true);
                        }}
                        title="Xóa"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {suppliers.length === 0 && !loading && (
            <div className="text-center py-4">
              <p className="text-muted">Không có nhà cung cấp nào</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Pagination */}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i> Trước
            </button>
          </li>
          
          <li className="page-item active">
            <span className="page-link">{currentPage}</span>
          </li>
          
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Sau <i className="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>

      {/* Modals */}
      <SupplierForm
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSubmit={handleCreateSupplier}
        title="Thêm nhà cung cấp mới"
      />

      <SupplierForm
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedSupplier(null);
        }}
        onSubmit={handleUpdateSupplier}
        supplier={selectedSupplier}
        title="Cập nhật nhà cung cấp"
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa nhà cung cấp <strong>{selectedSupplier?.name}</strong> không?
          <br />
          <small className="text-muted">Hành động này không thể hoàn tác.</small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDeleteSupplier}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Suppliers;