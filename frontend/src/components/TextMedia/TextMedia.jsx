// src/components/TextMedia/TextMedia.jsx
import Button from '../../atomes/buttons/Button';
import { TitleH3 } from '../../atomes/titles/Titles';
import styles from './TextMedia.module.scss';

const TextMedia = ({ 
  reverse = false, 
  image, 
  imageAlt = "Image illustrative",
  title, 
  text, 
  ctaText, 
  ctaVariant = "primary", 
  ctaLink,
  ctaAction,
  className = ''
}) => {
  const containerClasses = [
    styles.textMedia,
    reverse ? styles.reverse : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={containerClasses}>
      <div className={styles.mediaContainer}>
        <img src={image} alt={imageAlt} className={styles.media} />
      </div>

      <div className={styles.content}>
        <TitleH3>{title}</TitleH3>
        <p className={styles.text}>{text}</p>
        
        {ctaText && (
          <div className={styles.cta}>
            <Button 
              variant={ctaVariant} 
              to={ctaLink} 
              onClick={ctaAction}
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TextMedia;