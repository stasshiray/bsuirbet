import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { fetchTranslations, type TranslationResponse } from './api';

export type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Record<string, string>;
  loading: boolean;
  error: string | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'ru';
  });
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load translations from backend
  const loadTranslations = async (lang: Language) => {
    try {
      setLoading(true);
      setError(null);
      const response: TranslationResponse = await fetchTranslations(lang);
      setTranslations(response.translations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load translations');
      console.error('Failed to load translations:', err);
      // Fallback to empty translations if backend fails
      setTranslations({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations, loading, error }}>
      {children}
    </LanguageContext.Provider>
  );
};