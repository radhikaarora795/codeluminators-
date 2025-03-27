
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useBookmarks, SchemeItem } from '../context/BookmarkContext';
import { useLanguage } from '../context/LanguageContext';
import { Bookmark, Share2, FileDown, Trash2 } from 'lucide-react';
import { fadeInUp, staggeredFadeIn } from '../utils/animations';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

const BookmarkedSchemes: React.FC = () => {
  const { bookmarkedSchemes, removeBookmark } = useBookmarks();
  const { translate } = useLanguage();

  const handleShare = (scheme: SchemeItem) => {
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

  const handleExport = (scheme: SchemeItem) => {
    const schemeText = `
      ${scheme.name}
      ${'-'.repeat(scheme.name.length)}
      
      ${translate("Description")}: ${scheme.description}
      
      ${translate("Eligibility")}: ${scheme.eligibility}
      
      ${translate("Benefits")}: ${scheme.benefits}
      
      ${translate("Category")}: ${scheme.category}
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-10">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {translate("Bookmarked Schemes")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            {translate("Your Saved Schemes")}
          </h1>
          <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
            {translate("Access your bookmarked government schemes at any time, even offline.")}
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          variants={staggeredFadeIn(0.1)}
          initial="hidden"
          animate="visible"
        >
          {bookmarkedSchemes.length > 0 ? (
            bookmarkedSchemes.map((scheme) => (
              <motion.div 
                key={scheme.id} 
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                variants={fadeInUp}
              >
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
                
                <div className="mt-4 flex justify-end space-x-2">
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
                  <button 
                    onClick={() => removeBookmark(scheme.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={translate("Remove Bookmark")}
                  >
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-gray-50 rounded-lg">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">{translate("No Bookmarked Schemes")}</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {translate("You haven't bookmarked any schemes yet. Check your eligibility to discover relevant schemes.")}
              </p>
            </div>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookmarkedSchemes;
