
import { useState, useEffect } from 'react';
import { authService } from '../api/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Initialiser l'état de l'utilisateur à partir du localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  // Fonction de connexion
  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      const { user, token } = data;
      
      // Stocker le token et les informations utilisateur
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Une erreur est survenue lors de la connexion'
      };
    }
  };
  
  // Fonction d'inscription
  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      const { user, token } = data;
      
      // Stocker le token et les informations utilisateur
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Une erreur est survenue lors de l\'inscription'
      };
    }
  };
  
  // Fonction de déconnexion
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  
  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};
