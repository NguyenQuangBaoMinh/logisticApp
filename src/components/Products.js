// src/components/Products.js
import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const Products = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-primary">Danh sách sản phẩm</h2>
      
      <Alert variant="info" className="text-center">
        <h4>Tính năng đang phát triển</h4>
        <p>Component quản lý sản phẩm đang được phát triển.</p>
      </Alert>
    </Container>
  );
};

export default Products;