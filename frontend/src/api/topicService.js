import apiClient from './client';

export const topicService = {
  // Récupérer tous les topics
  getAllTopics: async () => {
    try {
      return await apiClient.get('/topic'); // Utilise votre structure /topic
    } catch (error) {
      console.error('Erreur lors de la récupération des topics:', error);
      throw error;
    }
  },

  // Créer un nouveau topic
  createTopic: async (topicData) => {
    try {
      return await apiClient.post('/topic', topicData);
    } catch (error) {
      console.error('Erreur lors de la création du topic:', error);
      throw error;
    }
  }
};