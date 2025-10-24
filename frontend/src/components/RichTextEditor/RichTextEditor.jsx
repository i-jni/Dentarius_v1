import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import styles from './RichTextEditor.module.scss';

const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Décrivez le contenu du cours...",
  readOnly = false,
  height = 300
}) => {
  if (readOnly) {
    return (
      <div className={styles.readOnlyPreview}>
        <MDEditor.Markdown source={value || 'Aucune description disponible.'} />
      </div>
    );
  }

  return (
    <div className={styles.mdEditorWrapper}>
      <MDEditor
        value={value || ''}
        onChange={onChange}
        height={height}
        preview="live"
        hideToolbar={false}
        visibleDragBar={false}
        textareaProps={{
          placeholder: placeholder,
          style: {
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: 'inherit'
          }
        }}
        data-color-mode="light"
      />
    </div>
  );
};

export default RichTextEditor;