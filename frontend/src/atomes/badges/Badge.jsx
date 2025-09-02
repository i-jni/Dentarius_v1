// src/atomes/badges/Badge.jsx
import PropTypes from 'prop-types';
import styles from './Badge.module.scss';

const Badge = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  className = ''
}) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default Badge;