import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseService } from '../api/courseService';
import { useAuthContext } from '../context/AuthContext';
import CourseImage from '../components/CourseImage/CourseImage';
import styles from './CourseDetailPage.module.scss';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Charger les détails du cours
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        setError('Erreur lors du chargement du cours');
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadCourse();
    }
  }, [id]);

  // Vérifier si l'utilisateur peut modifier/supprimer ce cours
  const canEditCourse = () => {
    if (!isAuthenticated || !course) return false;
    const createdCourses = JSON.parse(localStorage.getItem('userCreatedCourses') || '[]');
    return createdCourses.includes(course.id);
  };

  // Fonction de suppression
  const handleDelete = async () => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le cours "${course.title}" ?`)) {
      return;
    }

    setDeleting(true);
    try {
      await courseService.deleteCourse(course.id);
      
      // Retirer le cours de localStorage
      const createdCourses = JSON.parse(localStorage.getItem('userCreatedCourses') || '[]');
      const updatedCreatedCourses = createdCourses.filter(courseId => courseId !== course.id);
      localStorage.setItem('userCreatedCourses', JSON.stringify(updatedCreatedCourses));
      
      // Redirection vers la liste avec message de succès
      navigate('/courses', { 
        state: { message: 'Cours supprimé avec succès !' }
      });
    } catch (error) {
      setError('Erreur lors de la suppression du cours');
    } finally {
      setDeleting(false);
    }
  };

  // Fonctions de partage sur les réseaux sociaux
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Découvrez ce cours : ${course.title}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Découvrez ce cours : ${course.title} #Dentarius #Formation`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(course.title);
    const summary = encodeURIComponent(course.description || 'Cours de formation dentaire');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Découvrez ce cours : ${course.title} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    } catch (error) {
      // Fallback pour les navigateurs qui ne supportent pas l'API clipboard
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className={styles.loading}>Chargement du cours...</div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container">
        <div className={styles.error}>
          {error || 'Cours non trouvé'}
        </div>
        <Link to="/courses" className="btn btn--primary">
          Retour à la liste des cours
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.courseDetail}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/courses">Cours</Link>
          <span className={styles.separator}>›</span>
          <span>{course.title}</span>
        </nav>

        {/* Header du cours */}
       <header className={styles.courseHeader}>  
  {/* AJOUTER l'image hero */}  
  <div className={styles.courseHero}>  
    <CourseImage   
      title={course.title}  
      size="hero"  
      showOverlay={true}  
    />  
  </div>  
  
  <div className={styles.courseHeaderContent}>  
    <div className={styles.courseInfo}>  
      <h1>{course.title}</h1>  
        
      <div className={styles.courseMeta}>  
        <span className={styles.level}>  
          Niveau: {course.level?.name || 'Non défini'}  
        </span>  
        <span className={styles.date}>  
          Créé le {new Date(course.createdAt).toLocaleDateString('fr-FR')}  
        </span>  
        {canEditCourse() && (  
          <span className={styles.owner}>Votre cours</span>  
        )}  
      </div>  
  
      {/* Topics sous forme de badges */}  
      {course.topics && course.topics.length > 0 && (  
        <div className={styles.topics}>  
          <h3>Sujets :</h3>  
          <div className={styles.topicsList}>  
            {course.topics.map(topic => (  
              <span key={topic.id} className={styles.topic}>  
                {topic.name}  
              </span>  
            ))}  
          </div>  
        </div>  
      )}  
    </div>  
  
    {/* Actions du propriétaire */}  
    {canEditCourse() && (  
      <div className={styles.ownerActions}>  
        <Link   
          to={`/edit-course/${course.id}`}   
          className="btn btn--secondary"  
        >  
          Éditer le cours  
        </Link>  
        <button   
          onClick={handleDelete}  
          className="btn btn--danger"  
          disabled={deleting}  
        >  
          {deleting ? 'Suppression...' : 'Supprimer'}  
        </button>  
      </div>  
    )}  
  </div>  
</header>

        {/* Contenu du cours */}
        <main className={styles.courseContent}>
          <section className={styles.description}>
            <h2>Description</h2>
            <div className={styles.descriptionText}>
              {course.description ? (
                <p>{course.description}</p>
              ) : (
                <p className={styles.noDescription}>
                  Aucune description disponible pour ce cours.
                </p>
              )}
            </div>
          </section>

          {/* Section de partage */}
          <section className={styles.shareSection}>
            <h2>Partager ce cours</h2>
            <div className={styles.shareButtons}>
              <button 
                onClick={shareOnFacebook}
                className={`${styles.shareBtn} ${styles.facebook}`}
                title="Partager sur Facebook"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>

              <button 
                onClick={shareOnTwitter}
                className={`${styles.shareBtn} ${styles.twitter}`}
                title="Partager sur Twitter"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>

              <button 
                onClick={shareOnLinkedIn}
                className={`${styles.shareBtn} ${styles.linkedin}`}
                title="Partager sur LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>

              <button 
                onClick={shareOnWhatsApp}
                className={`${styles.shareBtn} ${styles.whatsapp}`}
                title="Partager sur WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </button>

              <button 
                onClick={copyToClipboard}
                className={`${styles.shareBtn} ${styles.copy}`}
                title="Copier le lien"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                Copier le lien
              </button>
            </div>
          </section>
        </main>

        {/* Actions de navigation */}
        <footer className={styles.courseFooter}>
          <Link to="/courses" className="btn btn--outline">
            ← Retour à la liste des cours
          </Link>
          
          {!canEditCourse() && isAuthenticated && (
            <Link to="/create-course" className="btn btn--primary">
              Créer un cours
            </Link>
          )}
        </footer>
      </div>
    </div>
  );
};

export default CourseDetailPage;