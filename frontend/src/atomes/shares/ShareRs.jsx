// src/atomes/shares/ShareRs.jsx
import styles from './shareRs.module.scss';

const ShareRs = ({ 
  url, 
  title, 
  position = 'fixed',
  className = ''
}) => {
  // Encoder les paramètres pour éviter les problèmes avec les caractères spéciaux
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const classes = [
    styles.share,
    styles[position],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes} aria-label="Partager sur les réseaux sociaux">
      <a 
        className={styles.twitter} 
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} 
        target="_blank" 
        rel="noreferrer"
        aria-label="Partager sur Twitter"
      >
        <i className="fa fa-twitter" aria-hidden="true"></i>
        <span className={styles.srOnly}>Twitter</span>
      </a>   
      
      <a 
        className={styles.instagram} 
        href={`https://www.instagram.com/?url=${encodedUrl}`} 
        target="_blank" 
        rel="noreferrer"
        aria-label="Partager sur Instagram"
      >
        <i className="fa fa-instagram" aria-hidden="true"></i>
        <span className={styles.srOnly}>Instagram</span>
      </a>
          
      <a 
        className={styles.facebook} 
        href={`https://www.facebook.com/share.php?u=${encodedUrl}&title=${encodedTitle}`} 
        target="_blank" 
        rel="noreferrer"
        aria-label="Partager sur Facebook"
      >
        <i className="fa fa-facebook" aria-hidden="true"></i>
        <span className={styles.srOnly}>Facebook</span>
      </a>
    </div>
  );
};

export default ShareRs;