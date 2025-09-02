// src/pages/RegisterPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { countryService } from '../api/countryService';
import { levelService } from '../api/levelService';
import FormSelect from '../components/FormSelect/FormSelect';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryId: '',
    levelId: '' // Ajout du champ levelId (optionnel)
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuthContext();
  const navigate = useNavigate();
  
  // Récupérer la liste des pays
  const { 
    data: countries, 
    isLoading: countriesLoading, 
    error: countriesError 
  } = useQuery({
    queryKey: ['countries'],
    queryFn: countryService.getAllCountries
  });
  
  // Récupérer la liste des niveaux
  const { 
    data: levels, 
    isLoading: levelsLoading, 
    error: levelsError 
  } = useQuery({
    queryKey: ['levels'],
    queryFn: levelService.getAllLevels
  });

  console.log('Niveaux errors:', levelsError);
  // Définir le premier pays comme valeur par défaut une fois les données chargées
  useEffect(() => {
    if (countries && countries.length > 0 && !formData.countryId) {
      setFormData(prev => ({ ...prev, countryId: countries[0].id.toString() }));
    }
  }, [countries]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation de base
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    setLoading(true);
    
    try {
      // Préparer les données à envoyer
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        countryId: parseInt(formData.countryId) // Convertir en nombre
      };
      
      console.log('Données d\'inscription envoyées:', userData);
      
      const result = await register(userData);
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Échec de l\'inscription');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Formater les options pour les sélecteurs
  const countryOptions = countries?.map(country => ({
    value: country.id.toString(),
    label: country.name
  })) || [];
  
  const levelOptions = levels?.map(level => ({
    value: level.id.toString(),
    label: level.name
  })) || [];
  
  // Afficher un message d'erreur si la récupération des données échoue
  if (countriesError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Impossible de charger les pays. Veuillez réessayer plus tard.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card__content">
              <h1 className="card__title text-center">Inscription</h1>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form__group">
                  <label htmlFor="firstName" className="form__label">
                    Prénom <span className="form__required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form__input"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form__group">
                  <label htmlFor="lastName" className="form__label">
                    Nom <span className="form__required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form__input"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form__group">
                  <label htmlFor="email" className="form__label">
                    Email <span className="form__required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form__input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form__group">
                  <label htmlFor="password" className="form__label">
                    Mot de passe <span className="form__required">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form__input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                  />
                  <div className="form__hint">
                    Le mot de passe doit contenir au moins 6 caractères.
                  </div>
                </div>
                
                <div className="form__group">
                  <label htmlFor="confirmPassword" className="form__label">
                    Confirmer le mot de passe <span className="form__required">*</span>
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form__input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <FormSelect
                  id="countryId"
                  name="countryId"
                  label="Pays"
                  value={formData.countryId}
                  onChange={handleChange}
                  options={countryOptions}
                  isLoading={countriesLoading}
                  loadingText="Chargement des pays..."
                  required={true}
                />
                
                <FormSelect
                  id="levelId"
                  name="levelId"
                  label="Niveau d'études (optionnel)"
                  value={formData.levelId}
                  onChange={handleChange}
                  options={levelOptions}
                  isLoading={levelsLoading}
                  loadingText="Chargement des niveaux..."
                  required={false}
                />
                
                <div className="form__actions">
                  <button
                    type="submit"
                    className="btn btn--primary btn--block"
                    disabled={loading || countriesLoading}
                  >
                    {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-3">
                <p>
                  Vous avez déjà un compte ?{' '}
                  <Link to="/login">Se connecter</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;