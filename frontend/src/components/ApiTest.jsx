// src/components/ApiTest.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { levelService } from '../api/levelService';
import { countryService } from '../api/countryService';

const ApiTest = () => {
  const [testType, setTestType] = useState('levels');
  
  // Requête pour récupérer les niveaux
  const levelsQuery = useQuery({
    queryKey: ['levels'],
    queryFn: levelService.getAllLevels,
    enabled: testType === 'levels'
  });
  
  // Requête pour récupérer les pays
  const countriesQuery = useQuery({
    queryKey: ['countries'],
    queryFn: countryService.getAllCountries,
    enabled: testType === 'countries'
  });
  
  // Déterminer l'état actuel
  const isLoading = 
    (testType === 'levels' && levelsQuery.isLoading) || 
    (testType === 'countries' && countriesQuery.isLoading);
  
  const error = 
    (testType === 'levels' && levelsQuery.error) || 
    (testType === 'countries' && countriesQuery.error);
  
  const data = 
    (testType === 'levels' && levelsQuery.data) || 
    (testType === 'countries' && countriesQuery.data);
  
  return (
    <div className="api-test">
      <h2>Test de l'API</h2>
      
      <div className="test-controls">
        <button 
          onClick={() => setTestType('levels')}
          className={`btn ${testType === 'levels' ? 'btn--primary' : 'btn--outline'}`}
        >
          Tester les niveaux
        </button>
        <button 
          onClick={() => setTestType('countries')}
          className={`btn ${testType === 'countries' ? 'btn--primary' : 'btn--outline'}`}
        >
          Tester les pays
        </button>
      </div>
      
      <div className="test-results">
        <h3>Résultats du test : {testType}</h3>
        
        {isLoading && <p>Chargement en cours...</p>}
        
        {error && (
          <div className="error-message">
            <p>Erreur : {error.message}</p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        
        {data && (
          <div className="data-display">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;