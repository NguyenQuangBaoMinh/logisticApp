// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/Home';
import Suppliers from './components/Supplier/Suppliers';
import Categories from './components/Category/Categories';
import Products from './components/Product/Products';
import Orders from './components/Order/Orders';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route không có layout (login, register...) */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes có layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;