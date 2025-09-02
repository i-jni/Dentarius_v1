// src/components/JoinUs/JoinUs.jsx
import { TitleH2 } from '../../atomes/titles/Titles';
import Button from '../../atomes/buttons/Button';
import styles from './JoinUs.module.scss';

const JoinUs = ({
  title = "Rejoignez notre communauté",
  subtitle = "Accédez à des cours de qualité et suivez votre progression",
  primaryButtonText = "S'inscrire",
  primaryButtonLink = "/register",
  secondaryButtonText = "En savoir plus",
  secondaryButtonLink = "/about",
  backgroundVariant = "primary",
  className = ''
}) => {
  const containerClasses = [
    styles.joinUs,
    styles[backgroundVariant],
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={containerClasses}>
      <div className={styles.content}>
        <TitleH2 className={styles.title}>{title}</TitleH2>
        <p className={styles.subtitle}>{subtitle}</p>
        
        <div className={styles.actions}>
          {primaryButtonText && (
            <Button 
              variant={backgroundVariant === 'primary' ? 'dark' : 'primary'} 
              size="lg" 
              to={primaryButtonLink}
            >
              {primaryButtonText}
            </Button>
          )}
          
          {secondaryButtonText && (
            <Button 
              variant="outline" 
              className={backgroundVariant === 'primary' ? 'dark' : 'primary'} 
              size="lg" 
              to={secondaryButtonLink}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default JoinUs;