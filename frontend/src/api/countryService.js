// src/api/countryService.js
import apiClient from './client';

export const countryService = {
  getAllCountries: async () => {
    return await apiClient.get('/country');
  }
};