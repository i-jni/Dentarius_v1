// src/atomes/titles/Titles.jsx
import styles from './titles.module.scss';

export const TitleH1 = ({ 
  children, 
  id, 
  className = '', 
  centered = false, 
  variant = '', 
  animated = false,
  withUnderline = false
}) => {
  const classes = [
    styles.heading1,
    centered ? styles.centered : '',
    variant ? styles[variant] : '',
    animated ? styles.animated : '',
    withUnderline ? styles.withUnderline : '',
    className
  ].filter(Boolean).join(' ');
  
  return <h1 id={id} className={classes}>{children}</h1>;
};

export const TitleH2 = ({ 
  children, 
  id, 
  className = '', 
  centered = false, 
  variant = '', 
  animated = false,
  withUnderline = false
}) => {
  const classes = [
    styles.heading2,
    centered ? styles.centered : '',
    variant ? styles[variant] : '',
    animated ? styles.animated : '',
    withUnderline ? styles.withUnderline : '',
    className
  ].filter(Boolean).join(' ');
  
  return <h2 id={id} className={classes}>{children}</h2>;
};

export const TitleH3 = ({ 
  children, 
  id, 
  className = '', 
  centered = false, 
  variant = '', 
  animated = false,
  withUnderline = false
}) => {
  const classes = [
    styles.heading3,
    centered ? styles.centered : '',
    variant ? styles[variant] : '',
    animated ? styles.animated : '',
    withUnderline ? styles.withUnderline : '',
    className
  ].filter(Boolean).join(' ');
  
  return <h3 id={id} className={classes}>{children}</h3>;
};

export const TitleH4 = ({ 
  children, 
  id, 
  className = '', 
  centered = false, 
  variant = '', 
  animated = false,
  withUnderline = false
}) => {
  const classes = [
    styles.heading4,
    centered ? styles.centered : '',
    variant ? styles[variant] : '',
    animated ? styles.animated : '',
    withUnderline ? styles.withUnderline : '',
    className
  ].filter(Boolean).join(' ');
  
  return <h4 id={id} className={classes}>{children}</h4>;
};