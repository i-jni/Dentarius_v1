import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { courseService } from '../api/courseService';
import { levelService } from '../api/levelService';
import { topicService } from '../api/topicService';
import { useAuthContext } from '../context/AuthContext';
import styles from './CreateCoursePage.module.scss'; // Réutilise les mêmes styles

const EditCoursePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, user } = useAuthContext();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    levelId: '',
    topicIds: []
  });
  
  const [levels, setLevels] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [canEdit, setCanEdit] = useState(false);

  // Redirection si non authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseData, levelsData, topicsData] = await Promise.all([
          courseService.getCourseById(id),
          levelService.getAllLevels(),
          topicService.getAllTopics()
        ]);

        setLevels(levelsData);
        setTopics(topicsData);
        
        // Vérifier si l'utilisateur peut éditer ce cours
        const createdCourses = JSON.parse(localStorage.getItem('userCreatedCourses') || '[]');
        const userCanEdit = createdCourses.includes(parseInt(id));
        setCanEdit(userCanEdit);
        
        if (!userCanEdit) {
          setError('Vous n\'avez pas l\'autorisation de modifier ce cours');
          return;
        }
        
        // Pré-remplir le formulaire avec les données du cours
        setFormData({
          title: courseData.title || '',
          description: courseData.description || '',
          levelId: courseData.levelId || '',
          topicIds: courseData.topics ? courseData.topics.map(topic => topic.id) : []
        });
        
      } catch (error) {
        setError('Erreur lors du chargement des données');
        console.error('Erreur:', error);
      } finally {
        setLoadingData(false);
      }
    };
    
    if (id && isAuthenticated) {
      loadData();
    }
  }, [id, isAuthenticated]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTopicChange = (topicId) => {
    setFormData(prev => ({
      ...prev,
      topicIds: prev.topicIds.includes(topicId)
        ? prev.topicIds.filter(id => id !== topicId)
        : [...prev.topicIds, topicId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error('Le titre est obligatoire');
      }
      if (!formData.levelId) {
        throw new Error('Le niveau est obligatoire');
      }

      // Préparer les données
      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        levelId: parseInt(formData.levelId),
        topicIds: formData.topicIds.map(id => parseInt(id))
      };

      // Mettre à jour le cours
      await courseService.updateCourse(id, courseData);
      
      // Redirection vers la liste des cours
      navigate('/courses', { 
        state: { message: 'Cours modifié avec succès !' }
      });
      
    } catch (error) {
      setError(error.message || 'Erreur lors de la modification du cours');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loadingData) {
    return (
      <div className="container">
        <div className={styles.createCourse}>
          <div className={styles.loading}>Chargement du cours...</div>
        </div>
      </div>
    );
  }

  // Vérification des permissions
  if (!canEdit) {
    return (
      <div className="container">
        <div className={styles.createCourse}>
          <div className={styles.error}>
            Vous n'avez pas l'autorisation de modifier ce cours.
          </div>
          <Link to="/courses" className="btn btn--primary">
            Retour à la liste des cours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.createCourse}>
        <h1>Modifier le cours</h1>
        
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Titre */}
          <div className={styles.formGroup}>
            <label htmlFor="title">Titre du cours *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Entrez le titre du cours"
              required
            />
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez le contenu du cours..."
              rows="6"
            />
          </div>

          {/* Niveau */}
          <div className={styles.formGroup}>
            <label htmlFor="levelId">Niveau *</label>
            <select
              id="levelId"
              name="levelId"
              value={formData.levelId}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez un niveau</option>
              {levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topics */}
          <div className={styles.formGroup}>
            <label>Sujets associés</label>
            <div className={styles.topicsGrid}>
              {topics.map(topic => (
                <label key={topic.id} className={styles.topicCheckbox}>
                  <input
                    type="checkbox"
                    checked={formData.topicIds.includes(topic.id)}
                    onChange={() => handleTopicChange(topic.id)}
                  />
                  <span>{topic.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Boutons */}
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={() => navigate('/courses')}
              className="btn btn--outline"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
            >
              {loading ? 'Modification...' : 'Modifier le cours'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;