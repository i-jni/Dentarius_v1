// src/components/Accordion/Accordion.jsx
import { useState } from 'react';
import { TitleH3 } from '../../atomes/titles/Titles';
import styles from './Accordion.module.scss';

const AccordionItem = ({ 
  title, 
  content, 
  isOpen, 
  onClick 
}) => {
  return (
    <div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.accordionHeader} 
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={styles.accordionTitle}>{title}</span>
        <span className={styles.accordionIcon}></span>
      </button>
      
      <div 
        className={styles.accordionContent}
        style={{ maxHeight: isOpen ? '1000px' : '0' }}
      >
        <div className={styles.accordionBody}>
          {content}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ 
  items, 
  allowMultiple = false,
  title,
  className = ''
}) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(index);
      }
      
      return newOpenItems;
    });
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      {title && <TitleH3 className={styles.accordionGroupTitle}>{title}</TitleH3>}
      
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openItems.has(index)}
          onClick={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;