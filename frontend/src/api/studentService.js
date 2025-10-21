// frontend/src/api/studentService.js
import apiClient from './client';

export const studentService = {
  // ========================================
  // GESTION DU PROFIL (ADAPTÉ À TON BACKEND)
  // ========================================

  // Récupérer le profil de l'étudiant connecté
  // On utilise l'ID de l'utilisateur connecté
  getProfile: async (userId) => {
    return await apiClient.get(`/student/${userId}`);
  },

  // Mettre à jour le profil
  updateProfile: async (userId, profileData) => {
    return await apiClient.put(`/student/${userId}`, profileData);
  },

  // Supprimer le compte
  deleteAccount: async (userId) => {
    return await apiClient.delete(`/student/${userId}`);
  },

  // Récupérer tous les étudiants
  getAllStudents: async () => {
    return await apiClient.get('/student');
  },

  // Récupérer un étudiant par ID
  getStudentById: async (id) => {
    return await apiClient.get(`/student/${id}`);
  },

  // Créer un nouvel étudiant
  createStudent: async (studentData) => {
    return await apiClient.post('/student', studentData);
  },

  // Mettre à jour un étudiant
  updateStudent: async (id, studentData) => {
    return await apiClient.put(`/student/${id}`, studentData);
  },

  // Supprimer un étudiant
  deleteStudent: async (id) => {
    return await apiClient.delete(`/student/${id}`);
  }

  // Note: Les autres méthodes (stats, notifications, etc.) 
  // nécessitent d'être ajoutées au backend d'abord
};