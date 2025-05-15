// src/configs/Apis.js
import axios from 'axios';

// API URLs
const BASE_URL = 'http://localhost:8080/SpringMVCLogistic';
const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  REGISTER: `${BASE_URL}/api/auth/register`,
  PROFILE: `${BASE_URL}/api/auth/profile`,
  LOGOUT: `${BASE_URL}/api/auth/logout`,
  SUPPLIERS: `${BASE_URL}/api/suppliers`
};

// Token storage
const TOKEN_KEY = 'auth_token';

// Local Storage Utils
export const StorageUtils = {
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  getToken: () => localStorage.getItem(TOKEN_KEY),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  hasToken: () => !!localStorage.getItem(TOKEN_KEY)
};

// Create axios instance for API calls
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
  withCredentials: true, // Important for session-based auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.params);
    
    // Add auth token if available (for JWT based auth)
    if (StorageUtils.hasToken() && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${StorageUtils.getToken()}`;
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response || error);
    
    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      StorageUtils.removeToken();
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions (keeping existing structure for compatibility)
export const AuthAPI = {
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data.token) {
        StorageUtils.setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (formData) => {
    try {
      return await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      throw error;
    }
  },

  getProfile: async () => {
    try {
      return await api.get('/auth/profile');
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    StorageUtils.removeToken();
    window.location.href = '/login';
  }
};

// Export the axios instance as default for other services
export default api;
export { API_ENDPOINTS };