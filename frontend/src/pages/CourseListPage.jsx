import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { courseService } from '../api/courseService';
import { useAuthContext } from '../context/AuthContext';
import styles from './CourseListPage.module.scss';

const CourseListPage = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Afficher le message de succès s'il y en a un
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Effacer le message après 5 secondes
      setTimeout(() => setMessage(''), 5000);
    }
  }, [location.state]);

  // Charger les cours
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data);
      } catch (error) {
        setError('Erreur lors du chargement des cours');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

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

        {courses.length === 0 ? (
          <div className={styles.empty}>
            <p>Aucun cours disponible pour le moment.</p>
            {isAuthenticated && (
              <Link to="/create-course" className="btn btn--primary">
                Créer le premier cours
              </Link>
            )}
          </div>
        ) : (
          <div className={styles.coursesGrid}>
            {courses.map(course => (
              <div key={course.id} className={styles.courseCard}>
                <h3>{course.title}</h3>
                <p className={styles.description}>
                  {course.description || 'Aucune description disponible'}
                </p>
                <div className={styles.meta}>
                  <span className={styles.level}>
                    Niveau: {course.level?.name || 'Non défini'}
                  </span>
                  <span className={styles.date}>
                    {new Date(course.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <Link 
                  to={`/courses/${course.id}`} 
                  className="btn btn--outline"
                >
                  Voir le cours
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListPage;