// src/components/Categories.js
import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const Categories = () => {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-primary">Danh sách danh mục</h2>
      
      <Alert variant="info" className="text-center">
        <h4>Tính năng đang phát triển</h4>
        <p>Component quản lý danh mục đang được phát triển.</p>
      </Alert>
    </Container>
  );
};

export default Categories;