// src/api/countryService.js
import apiClient from './client';

export const countryService = {
  getAllCountries: async () => {
    try {
      const data = await apiClient.get('/country');
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des pays:', error);
      throw error;
    }
  },
  
  getCountryById: async (id) => {
    try {
      const data = await apiClient.get(`/country/${id}`);
      return data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du pays ${id}:`, error);
      throw error;
    }
  }
};