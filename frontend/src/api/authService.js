// src/api/authService.js
import apiClient from './client';

export const authService = {
  login: async (credentials) => {
    try {
      const data = await apiClient.post('/auth/login', credentials);
      return data;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    try {
      console.log('Envoi des données au serveur:', userData);
      const data = await apiClient.post('/auth/register', userData);
      console.log('Réponse du serveur:', data);
      return data;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};