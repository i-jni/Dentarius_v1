// src/components/Footer/Footer.jsx
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Link to="/" className={styles.logo}>
              Dentarius
            </Link>
            <p className={styles.tagline}>
              La plateforme d'apprentissage pour les étudiants en dentaire
            </p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h3 className={styles.linkTitle}>Navigation</h3>
              <ul className={styles.linkList}>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/courses">Cours</Link></li>
                <li><Link to="/login">Connexion</Link></li>
                <li><Link to="/register">Inscription</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3 className={styles.linkTitle}>Légal</h3>
              <ul className={styles.linkList}>
                <li><Link to="/mentions-legales">Mentions légales</Link></li>
                <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Dentarius. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;