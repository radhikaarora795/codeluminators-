
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { languages, Language } from '../assets/languages';

interface LanguageContextProps {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
  currentLanguage: languages.english,
  setLanguage: () => {},
  translate: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages.english);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    // If we had a real translation API, we could update the app's UI here
  };

  const translate = (key: string): string => {
    // In a real app, this would use a proper translation API
    // For this demo, we'll just return the key itself
    if (currentLanguage.id === 'english') {
      return key;
    }
    
    // Simulate translation by adding the language name as a prefix
    return `[${currentLanguage.name}] ${key}`;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
