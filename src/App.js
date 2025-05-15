// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './styles/Auth.css';
import './styles/Header.css';

// Import components
import Login from './components/Login';
import Registers from './components/Registers';
import Home from './components/Home';
import Layout from './components/layout/Layout';
import SupplierManagement from './components/Supplier/SupplierManagement';
import authService from './services/authService';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// Dashboard Component (temporary)
const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/login';
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Dashboard</h1>
        {user && (
          <div className="user-info">
            <p>Chào mừng, {user.displayName}!</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Roles: {user.roles?.join(', ')}</p>
            <button onClick={handleLogout} className="logout-btn">
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Registers />
              </PublicRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Add more protected routes here */}
          <Route 
            path="/suppliers" 
            element={
              <ProtectedRoute>
                <Layout>
                  <SupplierManagement />
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <Layout>
                  <div>Orders Management Coming Soon...</div>
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/inventory" 
            element={
              <ProtectedRoute>
                <Layout>
                  <div>Inventory Management Coming Soon...</div>
                </Layout>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/shipping" 
            element={
              <ProtectedRoute>
                <Layout>
                  <div>Shipping Management Coming Soon...</div>
                </Layout>
              </ProtectedRoute>
            } 
          />

          {/* Redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;