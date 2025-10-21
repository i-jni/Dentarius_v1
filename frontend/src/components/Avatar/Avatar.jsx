import styles from './Avatar.module.scss';

const Avatar = ({ 
  firstName = '', 
  lastName = '', 
  size = 'medium',
  className = '' 
}) => {
  // Générer les initiales
  const getInitials = () => {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return first + last || '?';
  };

  // Générer une couleur basée sur le nom
  const getAvatarColor = () => {
    const name = `${firstName}${lastName}`.toLowerCase();
    if (!name) return '#6366f1'; // Couleur par défaut
    
    const colors = [
      '#ef4444', '#f97316', '#f59e0b', '#eab308',
      '#84cc16', '#22c55e', '#10b981', '#14b8a6',
      '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
      '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials();
  const backgroundColor = getAvatarColor();

  return (
    <div 
      className={`${styles.avatar} ${styles[size]} ${className}`}
      style={{ backgroundColor }}
      aria-label={`Avatar de ${firstName} ${lastName}`}
      title={`${firstName} ${lastName}`}
    >
      <span className={styles.initials}>
        {initials}
      </span>
    </div>
  );
};

export default Avatar;