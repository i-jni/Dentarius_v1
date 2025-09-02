// src/api/levelService.js
import apiClient from './client';

export const levelService = {
  getAllLevels: async () => {
    try {
      const data = await apiClient.get('/level');
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des niveaux:', error);
      throw error;
    }
  },
  
  getLevelById: async (id) => {
    try {
      const data = await apiClient.get(`/level/${id}`);
      return data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du niveau ${id}:`, error);
      throw error;
    }
  }
};