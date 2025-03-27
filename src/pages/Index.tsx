
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SchemeSearch from '../components/SchemeSearch';
import EligibilityChecker from '../components/EligibilityChecker';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SchemeSearch />
      <EligibilityChecker />
      <Chatbot />
      <div id="about" className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            About
          </span>
          <h2 className="text-3xl font-bold mt-2">
            Our Mission
          </h2>
          <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
            Empowering every citizen to access the government schemes they deserve.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass rounded-xl p-8">
          <p className="text-lg leading-relaxed mb-4">
            The Government Scheme Eligibility & Assistance platform bridges the gap between citizens and welfare programs through technology. Our AI-powered solution simplifies the discovery and application process for government schemes across India.
          </p>
          <p className="text-lg leading-relaxed">
            With multilingual support, voice commands, and personalized recommendations, we're making government welfare accessible to everyone, regardless of location, language, or technical expertise.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
