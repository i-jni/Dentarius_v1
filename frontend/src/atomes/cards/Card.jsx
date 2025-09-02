// src/atomes/cards/Card.jsx
import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = ({ 
  children, 
  variant = 'default',
  elevation = 'medium',
  className = '',
  onClick
}) => {
  return (
    <div 
      className={`
        ${styles.card} 
        ${styles[variant]} 
        ${styles[`elevation-${elevation}`]} 
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'interactive']),
  elevation: PropTypes.oneOf(['none', 'low', 'medium', 'high']),
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;