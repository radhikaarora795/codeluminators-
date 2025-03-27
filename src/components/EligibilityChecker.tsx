
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
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
  Tractor,
  Bookmark,
  Share2,
  FileDown,
  BookmarkCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import { toast } from '@/hooks/use-toast';

interface SchemeResult {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  category: string;
  stateSpecific?: boolean;
  state?: string;
}

const EligibilityChecker: React.FC = () => {
  const { translate } = useLanguage();
  const { addBookmark, isBookmarked } = useBookmarks();
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
    maritalStatus: '',
    interests: [] as string[]
  });
  const [results, setResults] = useState<SchemeResult[]>([]);

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
    // For now, we'll set some context-aware results based on the form inputs

    // Get some basic schemes that everyone qualifies for
    const baseSchemes: SchemeResult[] = [
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
      }
    ];
    
    // Add dynamic schemes based on user inputs
    let dynamicSchemes: SchemeResult[] = [];
    
    // Check for occupation-specific schemes
    if (formData.occupation === 'farmer') {
      dynamicSchemes.push({
        id: 3,
        name: 'Soil Health Card Scheme',
        description: 'Soil testing and nutrient recommendations',
        eligibility: 'All farmers',
        benefits: 'Free soil health card and personalized recommendations',
        category: 'Agriculture'
      });
    }
    
    // Check for income and education based schemes
    if (formData.income === 'below-1l' || formData.income === '1l-3l') {
      if (formData.education === 'below-10th' || formData.education === '10th-pass') {
        dynamicSchemes.push({
          id: 4,
          name: 'Pradhan Mantri Kaushal Vikas Yojana',
          description: 'Skill development training',
          eligibility: 'Youth with basic education',
          benefits: 'Free skill training and certification',
          category: 'Skill Development'
        });
      }
    }
    
    // Check for gender-specific schemes
    if (formData.gender === 'female') {
      dynamicSchemes.push({
        id: 5,
        name: 'Beti Bachao Beti Padhao',
        description: 'Promote education for girls',
        eligibility: 'Girl children',
        benefits: 'Educational incentives and scholarships',
        category: 'Education'
      });
    }
    
    // Check for disability schemes
    if (formData.disability === 'yes') {
      dynamicSchemes.push({
        id: 6,
        name: 'Assistance to Disabled Persons Scheme',
        description: 'Support for assistive devices',
        eligibility: 'Persons with disabilities',
        benefits: 'Subsidized assistive devices and aids',
        category: 'Disability Welfare'
      });
    }
    
    // Check for state-specific schemes
    if (formData.state === 'kerala') {
      dynamicSchemes.push({
        id: 7,
        name: 'Kerala Karunya Health Scheme',
        description: 'Financial assistance for medical treatment',
        eligibility: 'Kerala residents with low income',
        benefits: 'Financial support for critical illnesses',
        category: 'Health',
        stateSpecific: true,
        state: 'Kerala'
      });
    } else if (formData.state === 'tamil-nadu') {
      dynamicSchemes.push({
        id: 8,
        name: 'Tamil Nadu Chief Minister\'s Health Insurance',
        description: 'Comprehensive health coverage',
        eligibility: 'Tamil Nadu residents',
        benefits: 'Health insurance coverage up to ₹5 lakh',
        category: 'Health',
        stateSpecific: true,
        state: 'Tamil Nadu'
      });
    } else if (formData.state === 'gujarat') {
      dynamicSchemes.push({
        id: 9,
        name: 'Gujarat Mukhyamantri Yuva Swavalamban Yojana',
        description: 'Education support for youth',
        eligibility: 'Students from Gujarat with family income below ₹6 lakh',
        benefits: 'Financial assistance for higher education',
        category: 'Education',
        stateSpecific: true,
        state: 'Gujarat'
      });
    }
    
    // Combine and set results
    setResults([...baseSchemes, ...dynamicSchemes]);
    nextStep();
  };

  const handleBookmark = (scheme: SchemeResult) => {
    addBookmark(scheme);
    toast({
      title: translate("Scheme Bookmarked"),
      description: translate("You can access this scheme in your bookmarks."),
    });
  };

  const handleShare = (scheme: SchemeResult) => {
    if (navigator.share) {
      navigator.share({
        title: scheme.name,
        text: `${scheme.name}: ${scheme.description}`,
        url: window.location.href,
      }).then(() => {
        toast({
          title: translate("Shared Successfully"),
          description: translate("The scheme information has been shared."),
        });
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback for browsers that don't support the Share API
      const shareText = `${scheme.name}: ${scheme.description} - ${scheme.benefits}`;
      navigator.clipboard.writeText(shareText);
      toast({
        title: translate("Copied to Clipboard"),
        description: translate("The scheme information has been copied to clipboard."),
      });
    }
  };

  const handleExport = (scheme: SchemeResult) => {
    const schemeText = `
      ${scheme.name}
      ${'-'.repeat(scheme.name.length)}
      
      ${translate("Description")}: ${scheme.description}
      
      ${translate("Eligibility")}: ${scheme.eligibility}
      
      ${translate("Benefits")}: ${scheme.benefits}
      
      ${translate("Category")}: ${scheme.category}
      
      ${scheme.stateSpecific ? `${translate("State")}: ${scheme.state}` : ''}
    `;
    
    const blob = new Blob([schemeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: translate("Export Successful"),
      description: translate("Scheme details have been exported as a text file."),
    });
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{translate("Marital Status")}</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">{translate("Select marital status")}</option>
                  <option value="single">{translate("Single")}</option>
                  <option value="married">{translate("Married")}</option>
                  <option value="widowed">{translate("Widowed")}</option>
                  <option value="divorced">{translate("Divorced")}</option>
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
          <motion.div
            className="animate-fade-in"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-semibold mb-2">{translate("Eligible Schemes")}</h3>
            <p className="text-foreground/70 mb-6">{translate("Based on your profile, you may be eligible for the following schemes:")}</p>
            
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((scheme) => (
                  <motion.div 
                    key={scheme.id} 
                    className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                    variants={fadeInUp}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-primary">{scheme.name}</h4>
                        <p className="text-sm text-foreground/70 mb-2">{scheme.description}</p>
                        {scheme.stateSpecific && (
                          <span className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full mb-2">
                            {scheme.state}
                          </span>
                        )}
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
                    
                    <div className="mt-4 flex justify-end space-x-2">
                      <button 
                        onClick={() => handleBookmark(scheme)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title={translate("Bookmark")}
                        disabled={isBookmarked(scheme.id)}
                      >
                        {isBookmarked(scheme.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-primary" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-gray-500" />
                        )}
                      </button>
                      <button 
                        onClick={() => handleShare(scheme)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title={translate("Share")}
                      >
                        <Share2 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button 
                        onClick={() => handleExport(scheme)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        title={translate("Export")}
                      >
                        <FileDown className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </motion.div>
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
          </motion.div>
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
