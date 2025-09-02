// src/atomes/loaders/Loader.jsx
import PropTypes from 'prop-types';
import styles from './Loader.module.scss';

const Loader = ({ 
  size = 'medium', 
  variant = 'primary',
  text = 'Chargement...',
  showText = true,
  className = ''
}) => {
  return (
    <div className={`${styles.loader} ${className}`} role="status">
      <div className={`${styles.spinner} ${styles[size]} ${styles[variant]}`} aria-hidden="true"></div>
      {showText && <span className={styles.text}>{text}</span>}
      <span className={styles.srOnly}>Chargement en cours</span>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'white']),
  text: PropTypes.string,
  showText: PropTypes.bool,
  className: PropTypes.string
};

export default Loader;