
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languageList } from '../assets/languages';
import { Check, Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLanguageSelect = (langId: string) => {
    const selectedLang = languageList.find(lang => lang.id === langId);
    if (selectedLang) {
      setLanguage(selectedLang);
    }
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-200 hover:bg-secondary transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span>{currentLanguage.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 animate-scale-in origin-top-right">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {languageList.map((language) => (
                <button
                  key={language.id}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                    currentLanguage.id === language.id
                      ? 'bg-primary/5 text-primary'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleLanguageSelect(language.id)}
                  role="menuitem"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                  {currentLanguage.id === language.id && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
