// src/components/layout/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setUser(authService.getCurrentUser());
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/suppliers', label: 'Nhà cung cấp', icon: '🏢' },
    { path: '/orders', label: 'Đơn hàng', icon: '📦' },
    { path: '/inventory', label: 'Kho hàng', icon: '🏭' },
    { path: '/shipping', label: 'Vận chuyển', icon: '🚚' },
  ];

  return (
    <header className="modern-header">
      <div className="header-container">
        {/* Left side - Home dropdown button */}
        <div className="header-left">
          <div className="dropdown-container">
            <button 
              className="header-button dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Link to="/" className="home-link">Trang chủ</Link>
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/" onClick={() => setShowDropdown(false)} className="dropdown-item">
                  <span className="item-icon">🏠</span>
                  Trang chủ
                </Link>
                {isAuthenticated && menuItems.map((item, index) => (
                  <Link 
                    key={index}
                    to={item.path} 
                    onClick={() => setShowDropdown(false)}
                    className="dropdown-item"
                  >
                    <span className="item-icon">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Logo */}
        <div className="header-center">
          <h1 className="system-title">SCM System</h1>
        </div>

        {/* Right side - Auth button */}
        <div className="header-right">
          {!isAuthenticated ? (
            <Link to="/login" className="header-button auth-button">
              Đăng nhập
            </Link>
          ) : (
            <div className="user-menu">
              <span className="user-greeting">Xin chào, {user?.displayName}</span>
              <button onClick={handleLogout} className="header-button logout-button">
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Dropdown overlay */}
      {showDropdown && (
        <div 
          className="dropdown-overlay" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;