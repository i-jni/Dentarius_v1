// src/api/courseService.js
import apiClient from './client';

export const courseService = {
  getAllCourses: async () => {
    return await apiClient.get('/course');
  },
  
  getCourseById: async (id) => {
    return await apiClient.get(`/course/${id}`);
  },
  
  getCoursesByTopic: async (topicId) => {
    return await apiClient.get(`/course-topic/topic/${topicId}`);
  },
  
  searchCourses: async (query) => {
    return await apiClient.get(`/course/search?q=${query}`);
  }
};