// src/atomes/alerts/Alert.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Alert.module.scss';

const Alert = ({ 
  children, 
  variant = 'info',
  dismissible = false,
  icon,
  className = ''
}) => {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) {
    return null;
  }
  
  return (
    <div 
      className={`${styles.alert} ${styles[variant]} ${className}`}
      role="alert"
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.content}>{children}</div>
      
      {dismissible && (
        <button 
          className={styles.closeButton}
          onClick={() => setDismissed(true)}
          aria-label="Fermer l'alerte"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  dismissible: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string
};

export default Alert;