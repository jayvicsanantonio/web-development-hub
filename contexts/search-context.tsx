'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { SECTIONS } from '@/constants/sections';

type Resource = {
  title: string;
  href: string;
  description: string;
  section: string;
};

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Resource[];
  isSearching: boolean;
  clearSearch: () => void;
  currentCategory: string | null;
  setCurrentCategory: (category: string | null) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

const getAllResources = (): Resource[] => {
  return SECTIONS.flatMap((section) =>
    section.links.map((link) => ({
      title: link.title,
      href: link.href,
      description: link.description,
      section: section.title,
    }))
  );
};

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchQuery, setSearchQueryState] = useState('');
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  // No longer need pathname since we've removed the dedicated search route
  // and implemented in-place search on all pages

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);
  const clearSearch = useCallback(() => {
    setSearchQueryState('');
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    const allResources = getAllResources();
    
    // First filter by query
    let results = allResources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.section.toLowerCase().includes(query)
    );
    
    // Then filter by category if needed
    if (currentCategory) {
      results = results.filter(resource => resource.section === currentCategory);
    }
    
    setSearchResults(results);
  }, [searchQuery, currentCategory]);

  const contextValue = React.useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearching,
      clearSearch,
      currentCategory,
      setCurrentCategory,
    }),
    [
      searchQuery,
      searchResults,
      isSearching,
      setSearchQuery,
      clearSearch,
      currentCategory,
      setCurrentCategory,
    ]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
