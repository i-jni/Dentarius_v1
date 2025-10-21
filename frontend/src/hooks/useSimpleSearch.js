import { useState, useMemo } from 'react';

const useSimpleSearch = (data, searchFields = ['title', 'description']) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fonction de recherche optimisée
  const searchResults = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    // Si pas de terme de recherche, retourner toutes les données
    if (!searchTerm.trim()) {
      return data;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    
    return data.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (!value) return false;
        
        // Recherche dans les chaînes
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchLower);
        }
        
        // Recherche dans les tableaux (ex: topics)
        if (Array.isArray(value)) {
          return value.some(subItem => {
            if (typeof subItem === 'string') {
              return subItem.toLowerCase().includes(searchLower);
            }
            if (subItem && subItem.name) {
              return subItem.name.toLowerCase().includes(searchLower);
            }
            return false;
          });
        }
        
        return false;
      });
    });
  }, [data, searchTerm, searchFields]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return {
    searchTerm,
    searchResults,
    handleSearch,
    clearSearch,
    hasSearch: searchTerm.trim().length > 0,
    resultCount: searchResults.length
  };
};

export default useSimpleSearch;