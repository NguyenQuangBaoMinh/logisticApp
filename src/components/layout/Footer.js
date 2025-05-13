// src/components/layout/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Hệ thống quản lý chuỗi cung ứng</h5>
            <p className="mb-0">
              Giải pháp toàn diện cho việc quản lý chuỗi cung ứng hiện đại
            </p>
          </Col>
          
          <Col md={3}>
            <h6>Liên kết nhanh</h6>
            <ul className="list-unstyled">
              <li><a href="/suppliers" className="text-light text-decoration-none">Nhà cung cấp</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Sản phẩm</a></li>
              <li><a href="/orders" className="text-light text-decoration-none">Đơn hàng</a></li>
              <li><a href="/reports" className="text-light text-decoration-none">Báo cáo</a></li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h6>Hỗ trợ</h6>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-light text-decoration-none">Hướng dẫn</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Liên hệ</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-3" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              © 2024 Supply Chain Management System. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;