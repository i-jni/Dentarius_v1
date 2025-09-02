// src/components/TitleAndImage/TitleAndImage.jsx
import { TitleH2 } from '../../atomes/titles/Titles';
import Button from '../../atomes/buttons/Button';
import styles from './TitleAndImage.module.scss';

const TitleAndImage = ({
  title,
  subtitle,
  backgroundImage,
  ctaText,
  ctaLink,
  overlayOpacity = 0.5,
  textAlign = 'center',
  height = 'medium',
  className = ''
}) => {
  const containerClasses = [
    styles.titleAndImage,
    styles[`height-${height}`],
    styles[`align-${textAlign}`],
    className
  ].filter(Boolean).join(' ');

  const overlayStyle = {
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`
  };

  return (
    <section className={containerClasses} style={backgroundStyle}>
      <div className={styles.overlay} style={overlayStyle}></div>
      
      <div className={styles.content}>
        <TitleH2 className={styles.title}>{title}</TitleH2>
        
        {subtitle && (
          <p className={styles.subtitle}>{subtitle}</p>
        )}
        
        {ctaText && (
          <Button 
            variant="primary" 
            size="lg" 
            to={ctaLink}
            className={styles.cta}
          >
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
};

export default TitleAndImage;