// src/atomes/404/Quatre.jsx
import { Link } from 'react-router-dom';
import styles from './Quatre.module.scss';

const Quatre = ({ 
  message = "Page non trouvée", 
  showHomeLink = true,
  className = ''
}) => {
  return (
    <div className={`${styles.errorContainer} ${className}`} role="alert">
      <div className={styles.errorCode} aria-hidden="true">404</div>
      <p className={styles.errorMessage}>{message}</p>
      
      {showHomeLink && (
        <Link to="/" className="btn btn--primary">
          Retour à l'accueil
        </Link>
      )}
    </div>
  );
};

export default Quatre;