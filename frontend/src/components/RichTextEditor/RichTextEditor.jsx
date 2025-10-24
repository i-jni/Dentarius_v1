import { useState, useRef, useEffect } from 'react';
import styles from './RichTextEditor.module.scss';

const RichTextEditor = ({ 
  value = '', 
  onChange, 
  placeholder = "Écrivez votre contenu...",
  className = "",
  minHeight = "200px",
  readOnly = false
}) => {
  const [content, setContent] = useState(value);
  const editorRef = useRef(null);
  const [isActive, setIsActive] = useState({});

  // Initialiser le contenu au premier rendu
  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
      setContent(value);
    }
  }, []);

  // Mettre à jour le contenu quand value change (depuis parent)
  useEffect(() => {
    if (value !== content && editorRef.current) {
      // Sauvegarder la position du curseur
      const selection = window.getSelection();
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      
      // Mettre à jour le contenu seulement si différent
      if (editorRef.current.innerHTML !== value) {
        setContent(value);
        editorRef.current.innerHTML = value;
        
        // Restaurer le curseur si possible
        if (range && editorRef.current.contains(range.startContainer)) {
          try {
            selection.removeAllRanges();
            selection.addRange(range);
          } catch (e) {
            console.log(e);
            
            // Si erreur, placer le curseur à la fin
            const newRange = document.createRange();
            newRange.selectNodeContents(editorRef.current);
            newRange.collapse(false);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }
      }
    }
  }, [value, content]);

  const handleInput = () => {
    const newContent = editorRef.current.innerHTML;
    setContent(newContent);
    onChange?.(newContent);
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateActiveStates();
  };

  const updateActiveStates = () => {
    setIsActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
    });
  };

  const handleKeyDown = (e) => {
    // Seulement empêcher les raccourcis de formatage personnalisés
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          execCommand('bold');
          return;
        case 'i':
          e.preventDefault();
          execCommand('italic');
          return;
        case 'u':
          e.preventDefault();
          execCommand('underline');
          return;
      }
    }
    
    // Laisser passer toutes les autres touches normalement
    // Delete, Backspace, Ctrl+A, Ctrl+C, Ctrl+V, flèches, etc.
  };

  const handleFocus = () => {
    updateActiveStates();
  };

  const handleSelectionChange = () => {
    if (document.activeElement === editorRef.current) {
      updateActiveStates();
    }
  };

  const handleContextMenu = (e) => {
    console.log(e);
    // Permettre le menu contextuel (clic droit)
    // pour copier/coller/sélectionner tout
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  // Mode readonly - juste affichage
  if (readOnly) {
    return (
      <div 
        className={`${styles.readOnlyContent} ${className}`}
        dangerouslySetInnerHTML={{ __html: content || 'Aucune description disponible.' }}
      />
    );
  }

  return (
    <div className={`${styles.richTextEditor} ${className}`}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={`${styles.toolbarButton} ${isActive.bold ? styles.active : ''}`}
            onClick={() => execCommand('bold')}
            title="Gras (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          
          <button
            type="button"
            className={`${styles.toolbarButton} ${isActive.italic ? styles.active : ''}`}
            onClick={() => execCommand('italic')}
            title="Italique (Ctrl+I)"
          >
            <em>I</em>
          </button>
          
          <button
            type="button"
            className={`${styles.toolbarButton} ${isActive.underline ? styles.active : ''}`}
            onClick={() => execCommand('underline')}
            title="Souligné (Ctrl+U)"
          >
            <u>U</u>
          </button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            className={`${styles.toolbarButton} ${isActive.insertUnorderedList ? styles.active : ''}`}
            onClick={() => execCommand('insertUnorderedList')}
            title="Liste à puces"
          >
            • Liste
          </button>
          
          <button
            type="button"
            className={`${styles.toolbarButton} ${isActive.insertOrderedList ? styles.active : ''}`}
            onClick={() => execCommand('insertOrderedList')}
            title="Liste numérotée"
          >
            1. Liste
          </button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.toolbarGroup}>
          <select
            className={styles.formatSelect}
            onChange={(e) => {
              if (e.target.value) {
                execCommand('formatBlock', e.target.value);
                e.target.value = '';
              }
            }}
            title="Format de texte"
          >
            <option value="">Format</option>
            <option value="h1">Titre 1</option>
            <option value="h2">Titre 2</option>
            <option value="h3">Titre 3</option>
            <option value="p">Paragraphe</option>
          </select>
        </div>
      </div>

      {/* Editor - SANS dangerouslySetInnerHTML */}
      <div
        ref={editorRef}
        className={styles.editor}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onContextMenu={handleContextMenu}
        style={{ minHeight }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
    </div>
  );
};

export default RichTextEditor;