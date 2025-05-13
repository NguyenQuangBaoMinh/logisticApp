// src/components/Home.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="text-center">
        <Col>
          <h1 className="display-4 text-primary mb-4">
            Chào mừng đến với Hệ thống quản lý chuỗi cung ứng
          </h1>
          <p className="lead mb-5">
            Quản lý nhà cung cấp, sản phẩm và đơn hàng hiệu quả
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h5 className="card-title">
                <i className="fas fa-truck text-primary"></i><br />
                Nhà cung cấp
              </h5>
              <p className="card-text">
                Quản lý thông tin nhà cung cấp và đánh giá
              </p>
              <Button variant="primary" as={Link} to="/suppliers">
                Xem chi tiết
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h5 className="card-title">
                <i className="fas fa-tags text-success"></i><br />
                Danh mục
              </h5>
              <p className="card-text">
                Quản lý danh mục sản phẩm trong hệ thống
              </p>
              <Button variant="success" as={Link} to="/categories">
                Xem chi tiết
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h5 className="card-title">
                <i className="fas fa-box text-warning"></i><br />
                Sản phẩm
              </h5>
              <p className="card-text">
                Quản lý thông tin sản phẩm và tồn kho
              </p>
              <Button variant="warning" as={Link} to="/products">
                Xem chi tiết
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h5 className="card-title">
                <i className="fas fa-shopping-cart text-danger"></i><br />
                Đơn hàng
              </h5>
              <p className="card-text">
                Quản lý đơn hàng và theo dõi trạng thái
              </p>
              <Button variant="danger" as={Link} to="/orders">
                Xem chi tiết
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;