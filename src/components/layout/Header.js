// src/components/layout/Header.js
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-truck"></i> Hệ thống quản lý chuỗi cung ứng
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <i className="fas fa-home"></i> Trang chủ
            </Nav.Link>
            
            <NavDropdown title={<><i className="fas fa-cogs"></i> Quản lý</>} id="manage-dropdown">
              <NavDropdown.Item as={Link} to="/suppliers">
                <i className="fas fa-truck"></i> Nhà cung cấp
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products">
                <i className="fas fa-box"></i> Sản phẩm
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categories">
                <i className="fas fa-tags"></i> Danh mục
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/inventory">
                <i className="fas fa-warehouse"></i> Kho hàng
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link as={Link} to="/orders">
              <i className="fas fa-shopping-cart"></i> Đơn hàng
            </Nav.Link>
            
            <Nav.Link as={Link} to="/reports">
              <i className="fas fa-chart-bar"></i> Báo cáo
            </Nav.Link>
          </Nav>
          
          <Nav>
            <NavDropdown title={<><i className="fas fa-user"></i> Tài khoản</>} id="user-dropdown">
              <NavDropdown.Item href="#action/3.1">
                <i className="fas fa-user-edit"></i> Hồ sơ
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <i className="fas fa-cog"></i> Cài đặt
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">
                <i className="fas fa-sign-out-alt"></i> Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;