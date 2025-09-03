// src/components/Header/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import styles from './Header.module.scss';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            Dentarius
          </Link>
          
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? styles.activeLink : styles.navLink
                  }
                  end
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/courses" 
                  className={({ isActive }) => 
                    isActive ? styles.activeLink : styles.navLink
                  }
                >
                  Cours
                </NavLink>
              </li>
              {isAuthenticated && (
                <>
                  <li>
                    <NavLink 
                      to="/students" 
                      className={({ isActive }) => 
                        isActive ? styles.activeLink : styles.navLink
                      }
                    >
                      Étudiants
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/create-course" 
                      className={({ isActive }) => 
                        isActive ? styles.activeLink : styles.navLink
                      }
                    >
                      Créer un cours
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          
          <div className={styles.authActions}>
            {isAuthenticated ? (
              <>
                <span className={styles.userName}>
                  {user?.firstName || 'Utilisateur'}
                </span>
                <button 
                  className={`btn btn--outline ${styles.authButton}`}
                  onClick={logout}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`btn btn--outline ${styles.authButton}`}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className={`btn btn--primary ${styles.authButton}`}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;