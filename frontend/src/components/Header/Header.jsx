import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import styles from './Header.module.scss';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            Dentarius
          </Link>
          
          {/* Menu Burger Button */}
          <button 
            className={`${styles.burgerButton} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Menu de navigation"
            aria-expanded={isMenuOpen}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>
          
          {/* Navigation Desktop */}
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
              )}
            </ul>
          </nav>
          
          {/* Actions Auth Desktop */}
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
        
        {/* Menu Mobile */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    isActive ? styles.activeMobileLink : styles.mobileNavLink
                  }
                  onClick={closeMenu}
                  end
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/courses" 
                  className={({ isActive }) => 
                    isActive ? styles.activeMobileLink : styles.mobileNavLink
                  }
                  onClick={closeMenu}
                >
                  Cours
                </NavLink>
              </li>
              {isAuthenticated && (
                <li>
                  <NavLink 
                    to="/students" 
                    className={({ isActive }) => 
                      isActive ? styles.activeMobileLink : styles.mobileNavLink
                    }
                    onClick={closeMenu}
                  >
                    Étudiants
                  </NavLink>
                </li>
              )}
            </ul>
            
            {/* Actions Auth Mobile */}
            <div className={styles.mobileAuthActions}>
              {isAuthenticated ? (
                <>
                  <div className={styles.mobileUserInfo}>
                    <span className={styles.mobileUserName}>
                      {user?.firstName || 'Utilisateur'}
                    </span>
                  </div>
                  <button 
                    className={`btn btn--outline ${styles.mobileAuthButton}`}
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`btn btn--outline ${styles.mobileAuthButton}`}
                    onClick={closeMenu}
                  >
                    Connexion
                  </Link>
                  <Link 
                    to="/register" 
                    className={`btn btn--primary ${styles.mobileAuthButton}`}
                    onClick={closeMenu}
                  >
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        
        {/* Overlay pour fermer le menu */}
        {isMenuOpen && (
          <div 
            className={styles.overlay} 
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
};

export default Header;