// src/pages/HomePage.jsx
import { TitleH1, TitleH2 } from '../atomes/titles/Titles';
import styles from './HomePage.module.scss';
import ShareRs from '../atomes/shares/ShareRs';

import Button from '../atomes/buttons/Button';

const HomePage = () => {


  return (
    <div>
      {/* Hero section avec TitleAndImage */}

      
      <div className="container">
        {/* Section d'introduction */}
        <section className={styles.hero}>
          <TitleH1 
            centered 
            animated 
            variant="primary"
          >
            Bienvenue sur Dentarius
          </TitleH1>
          
          <p className={styles.heroText}>
            La plateforme d'apprentissage pour les étudiants en dentaire.
            Accédez à des cours de qualité et suivez votre progression.
          </p>
          
          <div className={styles.heroActions}>
            <Button
              variant="primary" 
              size="lg" 
              to="/courses"
            >
              Découvrir les cours
            </Button>
            
            <Button 
              variant="outline" 
              className="primary"
              size="lg" 
              to="/register"
            >
              S'inscrire gratuitement
            </Button>
          </div>
        </section>
        

 
        
   
    
        
        {/* Boutons de partage */}
        <ShareRs 
          url={window.location.href} 
          title="Dentarius - Plateforme d'apprentissage pour étudiants en dentaire" 
        />
      </div>
    </div>
  );
};

export default HomePage;