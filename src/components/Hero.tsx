
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { translate } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/10 animate-float" />
      <div className="absolute bottom-20 left-[5%] w-40 h-40 rounded-full bg-accent/20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/4 left-[15%] w-20 h-20 rounded-full bg-accent/10 animate-float" style={{ animationDelay: '0.5s' }} />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-block mb-6 animate-fade-in">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {translate("Government of India Initiative")}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {translate("Find Government Schemes")} <br />
          <span className="text-primary">{translate("You're Eligible For")}</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-foreground/80 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {translate("Discover schemes tailored to your profile, apply directly, and get AI-powered guidance throughout the process.")}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a 
            href="#eligibility" 
            className="btn-primary px-8 py-3 text-base rounded-full shadow-md hover:shadow-lg transition-all">
            {translate("Check Eligibility")}
          </a>
          <a 
            href="#ai-assistant" 
            className="btn-secondary px-8 py-3 text-base rounded-full border border-gray-200 hover:border-gray-300 transition-all">
            {translate("Ask AI Assistant")}
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse-slow">
          <ChevronDown className="w-8 h-8 text-primary/60" />
        </div>
      </div>

      {/* Glass card with stats */}
      <div className="w-full max-w-5xl mx-auto px-4 mt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="glass rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">1000+</p>
            <p className="text-foreground/70 mt-2">{translate("Government Schemes")}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">29</p>
            <p className="text-foreground/70 mt-2">{translate("States & Territories")}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">6</p>
            <p className="text-foreground/70 mt-2">{translate("Indian Languages")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
