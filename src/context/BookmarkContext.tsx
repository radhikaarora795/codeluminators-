
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface SchemeItem {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  category: string;
}

interface BookmarkContextProps {
  bookmarkedSchemes: SchemeItem[];
  addBookmark: (scheme: SchemeItem) => void;
  removeBookmark: (schemeId: number) => void;
  isBookmarked: (schemeId: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextProps>({
  bookmarkedSchemes: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  isBookmarked: () => false,
});

export const useBookmarks = () => useContext(BookmarkContext);

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<SchemeItem[]>(() => {
    // Load bookmarks from localStorage on initialization
    const savedBookmarks = localStorage.getItem('bookmarkedSchemes');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookmarkedSchemes', JSON.stringify(bookmarkedSchemes));
  }, [bookmarkedSchemes]);

  const addBookmark = (scheme: SchemeItem) => {
    if (!isBookmarked(scheme.id)) {
      setBookmarkedSchemes(prev => [...prev, scheme]);
    }
  };

  const removeBookmark = (schemeId: number) => {
    setBookmarkedSchemes(prev => prev.filter(scheme => scheme.id !== schemeId));
  };

  const isBookmarked = (schemeId: number) => {
    return bookmarkedSchemes.some(scheme => scheme.id === schemeId);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedSchemes, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};
