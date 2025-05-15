// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const Home = () => {
  const isAuthenticated = authService.isAuthenticated();

  const features = [
    {
      icon: '📦',
      title: 'Quản lý Nhà Cung Cấp',
      description: 'Quản lý thông tin, đánh giá và xếp hạng nhà cung cấp'
    },
    {
      icon: '📋',
      title: 'Quản lý Đơn Hàng',
      description: 'Theo dõi đơn hàng từ khi tạo đến khi giao hàng'
    },
    {
      icon: '🚚',
      title: 'Vận Chuyển & Giao Hàng',
      description: 'Lên lịch và theo dõi vận chuyển hiệu quả'
    }
  ];

  return (
    <div className="simple-home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Hệ thống Quản lý Chuỗi Cung Ứng</h1>
          <p>Giải pháp tối ưu cho việc quản lý chuỗi cung ứng của doanh nghiệp</p>
          {!isAuthenticated ? (
            <Link to="/register" className="btn-primary-large">
              Bắt đầu ngay
            </Link>
          ) : (
            <Link to="/dashboard" className="btn-primary-large">
              Vào Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Tính năng chính</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;