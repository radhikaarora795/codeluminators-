
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { translate } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-background py-4 sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-lg mr-2">
              <span className="text-primary text-xl font-bold">GS</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-none">GovSchemes</h1>
              <p className="text-xs text-foreground/60 leading-none">Eligibility Assistant</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a href="/#eligibility" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {translate("Eligibility Checker")}
              </a>
              <a href="/#about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                {translate("About")}
              </a>
              <Link to="/bookmarks" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center">
                <Bookmark className="w-4 h-4 mr-1" />
                {translate("Bookmarks")}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-foreground/80 hover:bg-secondary transition-colors"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a 
                href="/#eligibility" 
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {translate("Eligibility Checker")}
              </a>
              <a 
                href="/#about" 
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {translate("About")}
              </a>
              <Link 
                to="/bookmarks" 
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bookmark className="w-4 h-4 mr-1" />
                {translate("Bookmarks")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
