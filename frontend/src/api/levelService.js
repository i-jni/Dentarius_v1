// src/api/levelService.js
import apiClient from './client';

export const levelService = {
  getAllLevels: async () => {
    return await apiClient.get('/level');
  }
};