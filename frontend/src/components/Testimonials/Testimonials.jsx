// src/components/Testimonials/Testimonials.jsx
import { TitleH2 } from '../../atomes/titles/Titles';
import styles from './Testimonials.module.scss';

const TestimonialItem = ({ 
  quote, 
  author, 
  role, 
  avatar 
}) => {
  return (
    <div className={styles.testimonialItem}>
      <div className={styles.testimonialQuote}>
        <blockquote>"{quote}"</blockquote>
      </div>
      
      <div className={styles.testimonialAuthor}>
        {avatar && (
          <div className={styles.testimonialAvatar}>
            <img src={avatar} alt={author} />
          </div>
        )}
        
        <div className={styles.testimonialInfo}>
          <div className={styles.authorName}>{author}</div>
          {role && <div className={styles.authorRole}>{role}</div>}
        </div>
      </div>
    </div>
  );
};

const Testimonials = ({
  title = "Ce que nos utilisateurs disent",
  testimonials = [],
  variant = 'light',
  className = ''
}) => {
  const containerClasses = [
    styles.testimonials,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <section className={containerClasses}>
      <TitleH2 className={styles.title}>{title}</TitleH2>
      
      <div className={styles.testimonialGrid}>
        {testimonials.map((testimonial, index) => (
          <TestimonialItem
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            avatar={testimonial.avatar}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;