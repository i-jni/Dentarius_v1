import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '../api/courseService';
import { levelService } from '../api/levelService';
import { topicService } from '../api/topicService';
import { useAuthContext } from '../context/AuthContext';
import styles from './CreateCoursePage.module.scss';
import RichTextEditor from '../components/RichTextEditor/RichTextEditor';

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    levelId: '',
    topicIds: []
  });
  
  const [levels, setLevels] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirection si non authentifié
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Charger les niveaux et topics
  useEffect(() => {
    const loadData = async () => {
      try {
        const [levelsData, topicsData] = await Promise.all([
          levelService.getAllLevels(),
          topicService.getAllTopics()
        ]);
        setLevels(levelsData);
        setTopics(topicsData);
      } catch (error) {
        setError(`${error} Erreur lors de la chargement des datas `);
      }
    };
    
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

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

      // Créer le cours
      const newCourse = await courseService.createCourse(courseData);
      
      // AJOUTER L'ID DU COURS CRÉÉ À LOCALSTORAGE POUR LE TRACKING
      const createdCourses = JSON.parse(localStorage.getItem('userCreatedCourses') || '[]');
      createdCourses.push(newCourse.id);
      localStorage.setItem('userCreatedCourses', JSON.stringify(createdCourses));
      
      // Redirection vers la liste des cours
      navigate('/courses', { 
        state: { message: 'Cours créé avec succès !' }
      });
      
    } catch (error) {
      setError(error.message || 'Erreur lors de la création du cours');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container">
      <div className={styles.createCourse}>
        <h1>Créer un nouveau cours</h1>
        
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

          {/* richText */}
                <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <RichTextEditor
                value={formData.description}
                onChange={(content) => setFormData(prev => ({ ...prev, description: content }))}
                placeholder="Décrivez le contenu du cours..."
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
              {loading ? 'Création...' : 'Créer le cours'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCoursePage;