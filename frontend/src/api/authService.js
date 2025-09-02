// src/api/authService.js
import apiClient from './client';

export const authService = {
  login: async (credentials) => {
    const data = await apiClient.post('/auth/login', credentials);
    return data;
  },
  
  register: async (userData) => {
    const data = await apiClient.post('/auth/register', userData);
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};