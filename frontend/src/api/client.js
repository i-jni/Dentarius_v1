// src/api/client.js
const API_BASE_URL = 'http://localhost:3001/api';

// Fonction utilitaire pour les requêtes fetch
const fetchClient = async (endpoint, options = {}) => {
  // Ajouter le token d'authentification si disponible
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Vérifier si la réponse est OK
    if (!response.ok) {
      // Gérer les erreurs d'authentification (401)
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // Extraire le message d'erreur de la réponse
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur ${response.status}`);
    }
    
    // Vérifier si la réponse est vide
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// Méthodes HTTP
const apiClient = {
  get: (endpoint) => fetchClient(endpoint, { method: 'GET' }),
  
  post: (endpoint, data) => fetchClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => fetchClient(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => fetchClient(endpoint, { method: 'DELETE' }),
};

export default apiClient;