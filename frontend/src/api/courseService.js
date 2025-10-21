import apiClient from './client';

export const courseService = {
  // Récupérer tous les cours
  getAllCourses: async () => {
    try {
      return await apiClient.get('/course'); // Utilise votre structure /course
    } catch (error) {
      console.error('Erreur lors de la récupération des cours:', error);
      throw error;
    }
  },

  // Récupérer un cours par ID
  getCourseById: async (id) => {
    try {
      return await apiClient.get(`/course/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la récupération du cours ${id}:`, error);
      throw error;
    }
  },

  // Créer un nouveau cours
  createCourse: async (courseData) => {
    try {
      return await apiClient.post('/course', courseData);
    } catch (error) {
      console.error('Erreur lors de la création du cours:', error);
      throw error;
    }
  },

  // Mettre à jour un cours
  updateCourse: async (id, courseData) => {
    try {
      return await apiClient.put(`/course/${id}`, courseData);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du cours ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un cours
  deleteCourse: async (id) => {
    try {
      return await apiClient.delete(`/course/${id}`);
    } catch (error) {
      console.error(`Erreur lors de la suppression du cours ${id}:`, error);
      throw error;
    }
  }
};