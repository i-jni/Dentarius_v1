// src/atomes/buttons/Button.jsx
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  to, 
  href, 
  onClick, 
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  ariaLabel
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');
  
  // Si un lien interne est fourni
  if (to) {
    return (
      <Link 
        to={to} 
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }
  
  // Si un lien externe est fourni
  if (href) {
    return (
      <a 
        href={href} 
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  
  // Sinon, c'est un bouton
  return (
    <button 
      type={type} 
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;