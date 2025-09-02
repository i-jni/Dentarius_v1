// src/components/Stats/Stats.jsx
import { useState, useEffect, useRef } from 'react';
import styles from './Stats.module.scss';

// Composant pour animer les chiffres
const AnimatedValue = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isNumeric = !isNaN(parseInt(value.replace(/[^0-9]/g, '')));
  const numericValue = isNumeric ? parseInt(value.replace(/[^0-9]/g, '')) : 0;
  const suffix = isNumeric ? value.replace(/[0-9]/g, '') : value;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateValue();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const animateValue = () => {
    if (!isNumeric) {
      setCount(1);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  };

  return (
    <span ref={countRef}>
      {isNumeric ? count + suffix : value}
    </span>
  );
};

const StatItem = ({ 
  value, 
  label, 
  icon,
  description,
  color = 'primary'
}) => {
  return (
    <div className={`${styles.statItem} ${styles[`color-${color}`]}`}>
      <div className={styles.statContent}>
        {icon && <div className={styles.statIcon}>{icon}</div>}
        <div className={styles.statValue}>
          <AnimatedValue value={value} />
        </div>
        <div className={styles.statLabel}>{label}</div>
        {description && <div className={styles.statDescription}>{description}</div>}
      </div>
      <div className={styles.statBackground}></div>
    </div>
  );
};

const Stats = ({
  title,
  subtitle,
  stats = [],
  columns = 4,
  variant = 'light',
  withCards = true,
  className = ''
}) => {
  const containerClasses = [
    styles.stats,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  const gridClasses = [
    styles.statsGrid,
    styles[`columns-${columns}`],
    withCards ? styles.withCards : ''
  ].filter(Boolean).join(' ');

  // Couleurs pour les différents éléments
  const colors = ['primary', 'secondary', 'success', 'info'];

  return (
    <section className={containerClasses}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      
      <div className={gridClasses}>
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            description={stat.description}
            color={stat.color || colors[index % colors.length]}
          />
        ))}
      </div>
    </section>
  );
};

export default Stats;