import React from 'react';
import { useLanguage } from './LanguageContext';

interface TranslateProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Translate component that displays a translation by ID
 * Shows the translation if found, otherwise shows the ID itself as fallback
 */
const Translate: React.FC<TranslateProps> = ({ 
  id, 
  className, 
  style 
}) => {
  const { t } = useLanguage();
  
  // Get translation or use ID as fallback
  const translation = t[id] || id;
  
  return (
    <span className={className} style={style}>
      {translation}
    </span>
  );
};

export default Translate;
