
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBookmarks } from '../context/BookmarkContext';
import { schemes, getCategories, Scheme } from '../data/schemes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';
import { Search, Filter, Bookmark, BookmarkCheck, Share2, ChevronRight, FileDown } from 'lucide-react';

const SchemeSearch: React.FC = () => {
  const { translate } = useLanguage();
  const { addBookmark, isBookmarked, removeBookmark } = useBookmarks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>(schemes);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeScheme, setActiveScheme] = useState<Scheme | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const categories = getCategories();

  useEffect(() => {
    filterSchemes();
  }, [searchTerm, selectedCategories]);

  const filterSchemes = () => {
    let filtered = schemes;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(scheme => 
        scheme.name.toLowerCase().includes(term) || 
        scheme.description.toLowerCase().includes(term) ||
        scheme.category.toLowerCase().includes(term)
      );
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(scheme => 
        selectedCategories.includes(scheme.category)
      );
    }
    
    setFilteredSchemes(filtered);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleBookmark = (scheme: Scheme) => {
    if (isBookmarked(scheme.id)) {
      removeBookmark(scheme.id);
      toast({
        title: translate("Removed from Bookmarks"),
        description: translate("The scheme has been removed from your bookmarks."),
      });
    } else {
      addBookmark(scheme);
      toast({
        title: translate("Scheme Bookmarked"),
        description: translate("You can access this scheme in your bookmarks."),
      });
    }
  };

  const handleShare = (scheme: Scheme) => {
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

  const handleExport = (scheme: Scheme) => {
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

  const viewDetails = (scheme: Scheme) => {
    setActiveScheme(scheme);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  return (
    <section id="scheme-search" className="py-16 bg-gradient-to-b from-transparent to-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {translate("Scheme Directory")}
          </span>
          <h2 className="text-3xl font-bold mt-2">
            {translate("Find All Government Schemes")}
          </h2>
          <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
            {translate("Search and filter through all available government schemes. View details, bookmark, or share schemes of interest.")}
          </p>
        </div>
        
        {/* Search and filters */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" />
              <Input
                type="text"
                placeholder={translate("Search schemes...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium flex items-center">
                <Filter className="w-4 h-4 mr-1" />
                {translate("Filter by category:")}
              </span>
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scheme cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredSchemes.length > 0 ? (
            filteredSchemes.map((scheme) => (
              <motion.div
                key={scheme.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="h-full"
              >
                <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        {scheme.category}
                      </Badge>
                      {scheme.stateSpecific && (
                        <Badge variant="secondary" className="ml-2">
                          {scheme.state}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{scheme.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{scheme.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-sm">
                      <p className="font-medium mb-1">{translate("Benefits")}:</p>
                      <p className="text-foreground/70 line-clamp-2">{scheme.benefits}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2 border-t">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => viewDetails(scheme)}
                    >
                      {translate("View Details")}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleBookmark(scheme)}
                        title={isBookmarked(scheme.id) ? translate("Remove Bookmark") : translate("Bookmark")}
                      >
                        {isBookmarked(scheme.id) ? (
                          <BookmarkCheck className="text-primary" />
                        ) : (
                          <Bookmark />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShare(scheme)}
                        title={translate("Share")}
                      >
                        <Share2 />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleExport(scheme)}
                        title={translate("Export")}
                      >
                        <FileDown />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-foreground/70">
                {translate("No schemes found matching your search criteria. Try adjusting your filters.")}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Scheme details modal */}
      {showDetails && activeScheme && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Badge className="mb-2">{activeScheme.category}</Badge>
                  {activeScheme.stateSpecific && (
                    <Badge variant="outline" className="ml-2">
                      {activeScheme.state}
                    </Badge>
                  )}
                  <h2 className="text-2xl font-bold">{activeScheme.name}</h2>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBookmark(activeScheme)}
                  >
                    {isBookmarked(activeScheme.id) ? (
                      <BookmarkCheck className="text-primary" />
                    ) : (
                      <Bookmark />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare(activeScheme)}
                  >
                    <Share2 />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleExport(activeScheme)}
                  >
                    <FileDown />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground/50 uppercase">{translate("Description")}</h3>
                  <p className="mt-1">{activeScheme.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground/50 uppercase">{translate("Eligibility")}</h3>
                  <p className="mt-1">{activeScheme.eligibility}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground/50 uppercase">{translate("Benefits")}</h3>
                  <p className="mt-1">{activeScheme.benefits}</p>
                </div>
                {activeScheme.stateSpecific && (
                  <div>
                    <h3 className="text-sm font-medium text-foreground/50 uppercase">{translate("State")}</h3>
                    <p className="mt-1">{activeScheme.state}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  onClick={closeDetails}
                >
                  {translate("Close")}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default SchemeSearch;
