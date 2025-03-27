
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { translate } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-semibold">GS</span>
          </div>
          <h1 className="text-lg md:text-xl font-bold text-foreground">
            {translate("Government Scheme Eligibility")}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#eligibility" className="nav-link">
            {translate("Eligibility")}
          </a>
          <a href="#ai-assistant" className="nav-link">
            {translate("AI Assistant")}
          </a>
          <a href="#about" className="nav-link">
            {translate("About")}
          </a>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#eligibility"
              className="px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {translate("Eligibility")}
            </a>
            <a
              href="#ai-assistant"
              className="px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {translate("AI Assistant")}
            </a>
            <a
              href="#about"
              className="px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {translate("About")}
            </a>
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
