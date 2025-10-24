import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { courseService } from '../api/courseService';
import { useAuthContext } from '../context/AuthContext';
import CourseImage from '../components/CourseImage/CourseImage';
import SimpleSearch from '../components/SimpleSearch/SimpleSearch';
import useSimpleSearch from '../hooks/useSimpleSearch';
import styles from './CourseListPage.module.scss';
import RichTextEditor from '../components/RichTextEditor/RichTextEditor';

const CourseListPage = () => {
  const location = useLocation();
  const _navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [userCourses, setUserCourses] = useState(new Set()); // Stocker les IDs des cours de l'utilisateur

  // Hook de recherche simple
  const {
    searchTerm,
    searchResults,
    handleSearch,
    clearSearch,
    hasSearch,
    resultCount
  } = useSimpleSearch(courses, ['title', 'description']);

  // Afficher le message de succès s'il y en a un
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setTimeout(() => setMessage(''), 5000);
    }
  }, [location.state]);

  // Charger les cours
  const loadCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
      
      // Identifier les cours créés par l'utilisateur connecté
      if (user) {
        const userCreatedCourses = new Set();
        
        // Utiliser localStorage pour tracker les cours créés
        const createdCourses = JSON.parse(localStorage.getItem('userCreatedCourses') || '[]');
        createdCourses.forEach(courseId => userCreatedCourses.add(courseId));
        
        setUserCourses(userCreatedCourses);
      }
    } catch (error) {
      setError(`${error} Erreur lors de la chargement du cours`);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, [user]);

  // Vérifier si l'utilisateur peut modifier/supprimer un cours
  const canEditCourse = (course) => {
    return isAuthenticated && userCourses.has(course.id);
  };

  // Fonction de suppression
  const handleDelete = async (courseId, courseTitle) => {
    if (!canEditCourse({ id: courseId })) {
      setError('Vous ne pouvez supprimer que vos propres cours');
      return;
    }

    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le cours "${courseTitle}" ?`)) {
      return;
    }

    setDeletingId(courseId);
    try {
      await courseService.deleteCourse(courseId);
      setMessage('Cours supprimé avec succès !');
      
      // Retirer le cours de la liste des cours utilisateur
      const updatedUserCourses = new Set(userCourses);
      updatedUserCourses.delete(courseId);
      setUserCourses(updatedUserCourses);
      
      // Mettre à jour localStorage
      const createdCourses = JSON.parse(localStorage.getItem('userCreatedCourses') || '[]');
      const updatedCreatedCourses = createdCourses.filter(id => id !== courseId);
      localStorage.setItem('userCreatedCourses', JSON.stringify(updatedCreatedCourses));
      
      // Recharger la liste
      await loadCourses();
    } catch (error) {
      setError(`${error} Erreur lors de la suppression du cours`);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className={styles.loading}>Chargement des cours...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.courseList}>
        {/* Recherche simple */}
          <SimpleSearch
          onSearch={handleSearch}
          placeholder="Rechercher des cours par titre ou contenu..."
          initialValue={searchTerm}
        />
        {/* Indicateur de résultats de recherche */}
        {hasSearch && (
          <div className={styles.searchResults}>
            <p>
              <span>
                <strong>{resultCount}</strong> cours trouvé{resultCount > 1 ? 's' : ''} 
                pour "<em>{searchTerm}</em>"
              </span>
              <button 
                onClick={clearSearch}
                className={styles.clearSearchLink}
                aria-label="Effacer la recherche"
              >
                Effacer
              </button>
            </p>
          </div>
        )}
        <div className={styles.header}>
          
          <h1>Liste des cours</h1>
          {isAuthenticated && (
            <Link to="/create-course" className="btn btn--primary">
              Créer un cours
            </Link>
          )}
        </div>

        {message && (
          <div className={styles.success}>
            {message}
          </div>
        )}

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
   

        {/* Affichage conditionnel selon les résultats */}
        {searchResults.length === 0 ? (
          <div className={styles.empty}>
            {hasSearch ? (
              <>
                <p>Aucun cours ne correspond à votre recherche "<strong>{searchTerm}</strong>".</p>
                <button 
                  onClick={clearSearch}
                  className="btn btn--outline"
                >
                  Voir tous les cours
                </button>
              </>
            ) : courses.length === 0 ? (
              <>
                <p>Aucun cours disponible pour le moment.</p>
                {isAuthenticated && (
                  <Link to="/create-course" className="btn btn--primary">
                    Créer le premier cours
                  </Link>
                )}
              </>
            ) : null}
          </div>
        ) : (
          <div className={styles.coursesGrid}>  
            {searchResults.map(course => (  
              <div key={course.id} className={styles.courseCard}>  
                {/* Image du cours */}  
                <div className={styles.courseImageContainer}>  
                  <CourseImage   
                    title={course.title}  
                    size="card"  
                  />  
                </div>  
                  
                <div className={styles.courseContent}>  
                  <h3>{course.title}</h3>  
                <div className={styles.description}>    
              <RichTextEditor  
                value={course.description ?   
                  (course.description.length > 40 ?   
                    course.description.substring(0, 40) + '...' :   
                    course.description  
                  ) :   
                  'Aucune description disponible'  
                }  
                readOnly={true}  
  /> 
              </div>  
            
                  <div className={styles.meta}>  
                    <span className={styles.level}>  
                      Niveau: {course.level?.name || 'Non défini'}  
                    </span>  
                    <span className={styles.date}>  
                      {new Date(course.createdAt).toLocaleDateString('fr-FR')}  
                    </span>  
                    {canEditCourse(course) && (  
                      <span className={styles.owner}>Votre cours</span>  
                    )}  
                  </div>  
                    
                  {/* Topics sous forme de badges texte */}  
                  {course.topics && course.topics.length > 0 && (  
                    <div className={styles.topicsBadges}>  
                      {course.topics.slice(0, 3).map(topic => (  
                        <span key={topic.id} className={styles.topicBadge}>  
                          {topic.name}  
                        </span>  
                      ))}  
                      {course.topics.length > 3 && (  
                        <span className={styles.moreBadge}>  
                          +{course.topics.length - 3}  
                        </span>  
                      )}  
                    </div>  
                  )}  
                    
                  <div className={styles.actions}>  
                    <Link   
                      to={`/courses/${course.id}`}   
                      className="btn btn--outline"  
                    >  
                      Voir le cours  
                    </Link>  
                      
                    {canEditCourse(course) && (  
                      <div className={styles.adminActions}>  
                        <Link   
                          to={`/edit-course/${course.id}`}   
                          className="btn btn--secondary"  
                        >  
                          Éditer  
                        </Link>  
                        <button   
                          onClick={() => handleDelete(course.id, course.title)}  
                          className="btn btn--danger"  
                          disabled={deletingId === course.id}  
                        >  
                          {deletingId === course.id ? 'Suppression...' : 'Supprimer'}  
                        </button>  
                      </div>  
                    )}  
                  </div>  
                </div>  
              </div>  
            ))}  
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListPage;