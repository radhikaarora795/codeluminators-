
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const { translate } = useLanguage();
  
  return (
    <footer className="bg-primary/5 border-t border-primary/10 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-semibold">GS</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                {translate("Government Scheme Eligibility")}
              </h3>
            </div>
            <p className="text-sm text-foreground/70 mb-4">
              {translate("Empowering citizens with easy access to government welfare schemes through AI-powered eligibility checks and multilingual support.")}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{translate("Quick Links")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("Home")}
                </a>
              </li>
              <li>
                <a href="#eligibility" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("Eligibility Checker")}
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("AI Assistant")}
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("About Us")}
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("Contact")}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{translate("Government Resources")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("National Portal of India")}
                </a>
              </li>
              <li>
                <a href="https://www.mygov.in/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("MyGov Portal")}
                </a>
              </li>
              <li>
                <a href="https://www.umang.gov.in/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("UMANG App")}
                </a>
              </li>
              <li>
                <a href="https://digilocker.gov.in/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("DigiLocker")}
                </a>
              </li>
              <li>
                <a href="https://www.nsdl.gov.in/" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                  {translate("NSDL Services")}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{translate("Language Preference")}</h4>
            <p className="text-sm text-foreground/70 mb-4">
              {translate("Select your preferred language for a better experience.")}
            </p>
            <LanguageSwitcher />
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200 text-sm text-center text-foreground/60">
          <p>
            {translate("© 2023 Government Scheme Eligibility & Assistance. All rights reserved.")}
          </p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-primary transition-colors">
              {translate("Privacy Policy")}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {translate("Terms of Service")}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {translate("Accessibility")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
