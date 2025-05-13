// src/components/Supplier/SupplierFilter.js
import React from 'react';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

const SupplierFilter = ({ 
  searchName, 
  setSearchName, 
  filterActive, 
  setFilterActive, 
  sortBy, 
  setSortBy, 
  onSearch, 
  loading 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleClearFilter = () => {
    setSearchName('');
    setFilterActive('');
    setSortBy('');
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Tìm kiếm theo tên</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tên nhà cung cấp..."
              />
              <Button 
                variant="outline-secondary" 
                onClick={onSearch}
                disabled={loading}
              >
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="true">Hoạt động</option>
              <option value="false">Không hoạt động</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Sắp xếp</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Mặc định</option>
              <option value="name_asc">Tên A-Z</option>
              <option value="name_desc">Tên Z-A</option>
              <option value="date_desc">Mới nhất</option>
              <option value="date_asc">Cũ nhất</option>
              <option value="rating_desc">Đánh giá cao nhất</option>
              <option value="rating_asc">Đánh giá thấp nhất</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>&nbsp;</Form.Label>
            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Đang tìm...
                  </>
                ) : (
                  <>
                    <i className="fas fa-filter"></i> Lọc
                  </>
                )}
              </Button>
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Clear filter button */}
      {(searchName || filterActive || sortBy) && (
        <Row className="mt-3">
          <Col>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={handleClearFilter}
              disabled={loading}
            >
              <i className="fas fa-times"></i> Xóa bộ lọc
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
};

export default SupplierFilter;