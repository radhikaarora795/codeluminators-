
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Filter, Search, BookmarkIcon, Share2Icon, Leaf, Stethoscope, School, Home, Briefcase } from 'lucide-react';
import { schemes, getCategories } from '../data/schemes';
import { Input } from './ui/input';
import { Button } from './ui/button';

const SchemeSearch: React.FC = () => {
  const { translate } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getCategories();
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'agriculture':
        return Leaf;
      case 'health':
        return Stethoscope;
      case 'education':
        return School;
      case 'housing':
        return Home;
      case 'employment':
      case 'skill development':
        return Briefcase;
      default:
        return Leaf;
    }
  };
  
  const getCategoryColorScheme = (category: string) => {
    switch (category.toLowerCase()) {
      case 'agriculture':
        return 'green';
      case 'health':
        return 'blue';
      case 'education':
        return 'yellow';
      case 'housing':
        return 'orange';
      case 'employment':
      case 'skill development':
        return 'purple';
      default:
        return 'primary';
    }
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const filteredSchemes = schemes.filter(scheme => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === null || scheme.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <section id="scheme-search" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {translate("Search")}
          </span>
          <h2 className="text-3xl font-bold mt-2">
            {translate("Find Relevant Schemes")}
          </h2>
          <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
            {translate("Search through thousands of government schemes to find ones relevant to your needs.")}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder={translate("Search for schemes by name, category, or keywords...")}
              className="pl-10 pr-10 py-6 w-full shadow-sm focus:ring-primary focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button className="p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors">
                <Filter className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Button 
              variant={selectedCategory === null ? "default" : "ghost"}
              className={`px-4 py-2 rounded-full ${selectedCategory === null ? 'bg-primary text-primary-foreground' : 'bg-white text-foreground/70'} text-sm transition-colors`}
              onClick={() => handleCategoryClick(null)}
            >
              {translate("All Schemes")}
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-white text-foreground/70'} text-sm transition-colors`}
                onClick={() => handleCategoryClick(category)}
              >
                {translate(category)}
              </Button>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredSchemes.slice(0, 4).map((scheme) => {
                const colorScheme = scheme.colorScheme || getCategoryColorScheme(scheme.category);
                const Icon = scheme.icon || getCategoryIcon(scheme.category);
                
                return (
                  <div key={scheme.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${colorScheme}-500/10`}>
                        <Icon className={`w-5 h-5 text-${colorScheme}-500`} />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{translate(scheme.name)}</h3>
                        <p className="text-xs text-muted-foreground">{translate(scheme.category)}</p>
                      </div>
                    </div>
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{translate(scheme.description)}</p>
                    <div className="flex items-center justify-between">
                      <button className="text-xs text-primary hover:underline">
                        {translate("View Details")}
                      </button>
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors">
                          {scheme.shareIcon || <Share2Icon className="w-4 h-4 text-muted-foreground" />}
                        </button>
                        <button className="p-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors">
                          {scheme.bookmarkIcon || <BookmarkIcon className="w-4 h-4 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          
          {filteredSchemes.length === 0 ? (
            <div className="mt-8 text-center p-8 bg-white rounded-lg border border-gray-100">
              <p className="text-lg font-medium text-foreground/70">
                {translate("No schemes found matching")} {searchQuery ? `"${searchQuery}"` : ""}
                {selectedCategory ? ` ${translate("in")} ${translate(selectedCategory)}` : ""}
              </p>
              <p className="mt-2 text-muted-foreground">
                {translate("Try a different search term or browse by category")}
              </p>
            </div>
          ) : filteredSchemes.length > 4 && (
            <div className="mt-8 text-center">
              <button className="px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                {translate("Browse All Schemes")}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SchemeSearch;
