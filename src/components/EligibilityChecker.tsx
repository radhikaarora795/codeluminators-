
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import StateSelector from './StateSelector';
import { 
  Check, 
  ChevronRight, 
  Users, 
  BadgeIndianRupee, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Heart, 
  Home, 
  Tractor
} from 'lucide-react';

const EligibilityChecker: React.FC = () => {
  const { translate } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: '',
    age: '',
    gender: '',
    income: '',
    occupation: '',
    education: '',
    category: '',
    disability: 'no',
    interests: [] as string[]
  });
  const [results, setResults] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleStateSelect = (stateId: string) => {
    setFormData(prev => ({ ...prev, state: stateId }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const checkEligibility = () => {
    // In a real app, this would call an API to get matching schemes
    // For now, we'll just set some dummy results
    setResults([
      {
        id: 1,
        name: 'PM Kisan Samman Nidhi',
        description: 'Income support for farmers',
        eligibility: 'All small and marginal farmers',
        benefits: '₹6,000 per year in three installments',
        category: 'Agriculture'
      },
      {
        id: 2,
        name: 'Ayushman Bharat',
        description: 'Health insurance scheme',
        eligibility: 'Low income families',
        benefits: 'Coverage up to ₹5 lakh per family per year',
        category: 'Health'
      },
      {
        id: 3,
        name: 'PM Awas Yojana',
        description: 'Housing scheme for all',
        eligibility: 'Low income families without proper housing',
        benefits: 'Financial assistance for house construction',
        category: 'Housing'
      }
    ]);
    nextStep();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">{translate("Where are you from?")}</h3>
            <StateSelector onStateSelect={handleStateSelect} selectedState={formData.state} />
            
            <div className="mt-6 flex justify-between">
              <div></div> {/* Empty div for spacing */}
              <button
                className="btn-primary rounded-full px-6 flex items-center"
                onClick={nextStep}
                disabled={!formData.state}
              >
                {translate("Next")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">{translate("Tell us about yourself")}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{translate("Age")}</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={translate("Your age")}
                  min="1"
                  max="120"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{translate("Gender")}</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">{translate("Select gender")}</option>
                  <option value="male">{translate("Male")}</option>
                  <option value="female">{translate("Female")}</option>
                  <option value="other">{translate("Other")}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{translate("Annual Income (₹)")}</label>
                <select
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">{translate("Select income range")}</option>
                  <option value="below-1l">{translate("Below ₹1,00,000")}</option>
                  <option value="1l-3l">{translate("₹1,00,000 - ₹3,00,000")}</option>
                  <option value="3l-5l">{translate("₹3,00,000 - ₹5,00,000")}</option>
                  <option value="5l-10l">{translate("₹5,00,000 - ₹10,00,000")}</option>
                  <option value="above-10l">{translate("Above ₹10,00,000")}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{translate("Occupation")}</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">{translate("Select occupation")}</option>
                  <option value="farmer">{translate("Farmer")}</option>
                  <option value="business">{translate("Business")}</option>
                  <option value="service">{translate("Service / Job")}</option>
                  <option value="self-employed">{translate("Self-employed")}</option>
                  <option value="student">{translate("Student")}</option>
                  <option value="unemployed">{translate("Unemployed")}</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                className="btn-secondary rounded-full px-6"
                onClick={prevStep}
              >
                {translate("Back")}
              </button>
              <button
                className="btn-primary rounded-full px-6 flex items-center"
                onClick={nextStep}
                disabled={!formData.age || !formData.gender || !formData.income || !formData.occupation}
              >
                {translate("Next")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">{translate("Additional Information")}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{translate("Education")}</label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{translate("Select education level")}</option>
                  <option value="below-10th">{translate("Below 10th")}</option>
                  <option value="10th-pass">{translate("10th Pass")}</option>
                  <option value="12th-pass">{translate("12th Pass")}</option>
                  <option value="graduate">{translate("Graduate")}</option>
                  <option value="post-graduate">{translate("Post Graduate")}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{translate("Category")}</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{translate("Select category")}</option>
                  <option value="general">{translate("General")}</option>
                  <option value="obc">{translate("OBC")}</option>
                  <option value="sc">{translate("SC")}</option>
                  <option value="st">{translate("ST")}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{translate("Disability Status")}</label>
                <div className="flex space-x-4 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="disability"
                      value="yes"
                      checked={formData.disability === 'yes'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary"
                    />
                    <span className="ml-2 text-sm">{translate("Yes")}</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="disability"
                      value="no"
                      checked={formData.disability === 'no'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary"
                    />
                    <span className="ml-2 text-sm">{translate("No")}</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                {translate("Areas of Interest (Select all that apply)")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  { id: 'agriculture', label: translate("Agriculture"), icon: Tractor },
                  { id: 'education', label: translate("Education"), icon: GraduationCap },
                  { id: 'health', label: translate("Health"), icon: Heart },
                  { id: 'housing', label: translate("Housing"), icon: Home },
                  { id: 'skill-development', label: translate("Skill Development"), icon: Briefcase },
                  { id: 'financial-aid', label: translate("Financial Aid"), icon: BadgeIndianRupee },
                  { id: 'family-welfare', label: translate("Family Welfare"), icon: Users },
                  { id: 'pension', label: translate("Pension"), icon: Calendar }
                ].map((interest) => (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`flex items-center justify-center p-3 rounded-lg border transition-all ${
                      formData.interests.includes(interest.id)
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <interest.icon className="w-5 h-5 mr-2" />
                    <span className="text-sm">{interest.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                className="btn-secondary rounded-full px-6"
                onClick={prevStep}
              >
                {translate("Back")}
              </button>
              <button
                className="btn-primary rounded-full px-6 flex items-center"
                onClick={checkEligibility}
              >
                {translate("Check Eligibility")}
                <Check className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">{translate("Eligible Schemes")}</h3>
            <p className="text-foreground/70 mb-6">{translate("Based on your profile, you may be eligible for the following schemes:")}</p>
            
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((scheme) => (
                  <div key={scheme.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm card-hover">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-primary">{scheme.name}</h4>
                        <p className="text-sm text-foreground/70 mb-2">{scheme.description}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        {scheme.category}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h5 className="text-xs font-medium text-foreground/50 uppercase">{translate("Eligibility")}</h5>
                        <p className="text-sm">{scheme.eligibility}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-foreground/50 uppercase">{translate("Benefits")}</h5>
                        <p className="text-sm">{scheme.benefits}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button className="btn-secondary text-sm px-4 py-1 rounded-full">
                        {translate("View Details")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-foreground/70">
                  {translate("No matching schemes found. Try adjusting your criteria.")}
                </p>
              </div>
            )}
            
            <div className="mt-6 flex justify-between">
              <button
                className="btn-secondary rounded-full px-6"
                onClick={prevStep}
              >
                {translate("Back")}
              </button>
              <button
                className="btn-primary rounded-full px-6"
                onClick={() => setStep(1)}
              >
                {translate("Start Over")}
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="eligibility" className="py-16 bg-gradient-to-b from-transparent to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {translate("Eligibility Checker")}
          </span>
          <h2 className="text-3xl font-bold mt-2">
            {translate("Find Schemes You Qualify For")}
          </h2>
          <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
            {translate("Answer a few questions about yourself to discover government schemes tailored to your profile.")}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Progress steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between w-full max-w-xs mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors ${
                      step >= i
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > i ? <Check className="w-4 h-4" /> : i}
                  </div>
                  <div className="text-xs text-foreground/70">
                    {i === 1 && translate("Location")}
                    {i === 2 && translate("Profile")}
                    {i === 3 && translate("Details")}
                    {i === 4 && translate("Results")}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gray-200 w-full max-w-xs"></div>
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-primary transition-all"
                style={{ width: `${((step - 1) / 3) * 100}%`, maxWidth: '100%' }}
              ></div>
            </div>
          </div>
          
          {/* Form card */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilityChecker;
