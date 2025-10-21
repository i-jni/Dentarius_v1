import { useState, useEffect, useRef } from 'react';
import styles from './SimpleSearch.module.scss';

const SimpleSearch = ({ 
  onSearch, 
  placeholder = "Rechercher des cours...",
  initialValue = "",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const timeoutRef = useRef(null);

  // Debounce pour la recherche (300ms)
  useEffect(() => {
    // Annuler le timeout précédent
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Nouveau timeout
    timeoutRef.current = setTimeout(() => {
      setIsSearching(true);
      onSearch(searchTerm.trim());
      setIsSearching(false);
    }, 300);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, onSearch]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    // Échapper pour vider la recherche
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className={`${styles.simpleSearch} ${className}`}>
      <div className={styles.searchContainer}>
        {/* Label caché mais accessible */}
        <label htmlFor="course-search" className={styles.visuallyHidden}>
          {placeholder}
        </label>
        
        {/* Icône de recherche */}
        <svg 
          className={styles.searchIcon} 
          viewBox="0 0 24 24" 
          width="20" 
          height="20"
          aria-hidden="true"
        >
          <path 
            fill="currentColor" 
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>

        {/* Champ de recherche */}
        <input
          ref={inputRef}
          id="course-search"
          type="search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-describedby="search-help"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Bouton effacer (visible seulement si du texte) */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Effacer la recherche"
            title="Effacer la recherche (Échap)"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path 
                fill="currentColor" 
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        )}

        {/* Indicateur de recherche en cours */}
        {isSearching && (
          <div className={styles.searchingIndicator} aria-hidden="true">
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>

      {/* Aide contextuelle cachée */}
      <div id="search-help" className={styles.visuallyHidden}>
        Tapez pour rechercher des cours. Utilisez Échap pour effacer.
      </div>
    </div>
  );
};

export default SimpleSearch;