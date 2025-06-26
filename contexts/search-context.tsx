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
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/search' && searchQuery) {
      setSearchQueryState('');
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [pathname, searchQuery]);

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

    const results = allResources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.section.toLowerCase().includes(query)
    );

    setSearchResults(results);
  }, [searchQuery]);

  const contextValue = React.useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearching,
      clearSearch,
    }),
    [
      searchQuery,
      searchResults,
      isSearching,
      setSearchQuery,
      clearSearch,
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
