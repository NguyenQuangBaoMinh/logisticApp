// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/SpringMVCLogistic/api/auth';

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || 'Đăng ký thất bại',
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Store user info in localStorage
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || 'Đăng nhập thất bại',
      };
    }
  },

  // Get current user profile
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data || 'Không thể lấy thông tin profile',
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
      localStorage.removeItem('user');
      return {
        success: true,
        message: 'Đăng xuất thành công',
      };
    } catch (error) {
      localStorage.removeItem('user');
      return {
        success: false,
        message: error.response?.data || 'Lỗi khi đăng xuất',
      };
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('user');
  },
};

export default authService;