// src/components/Login.js
import React from 'react';
import { Container, Card, Alert } from 'react-bootstrap';

const Login = () => {
  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Đăng nhập</h3>
          
          <Alert variant="info" className="text-center">
            <h6>Trang đăng nhập</h6>
            <p>Tính năng authentication đang phát triển.</p>
          </Alert>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;