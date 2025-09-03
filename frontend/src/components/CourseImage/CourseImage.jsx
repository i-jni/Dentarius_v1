import defaultCourseImg from '../../assets/images/course-default.png';
import styles from './CourseImage.module.scss';

const CourseImage = ({ 
  title = 'Cours', 
  size = 'medium', 
  className = '',
  showOverlay = false 
}) => {
  return (
    <div className={`${styles.courseImage} ${styles[size]} ${className}`}>
      <img 
        src={defaultCourseImg} 
        alt={`Image pour le cours ${title}`}
        className={styles.image}
        loading="lazy"
      />
      {showOverlay && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <span className={styles.courseTitle}>{title}</span>
          </div>
        </div>
      )}
    </div>
  );
};

    export default CourseImage;