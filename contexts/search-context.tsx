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
import { useFavorites } from './favorites-context';

type Resource = {
  title: string;
  href: string;
  description: string;
  section: string;
  tags?: string[];
};

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Resource[];
  clearSearch: () => void;
  currentCategory: string | null;
  setCurrentCategory: (category: string | null) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  clearFilters: () => void;
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
      tags: link.tags,
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
  const [currentCategory, setCurrentCategory] = useState<
    string | null
  >(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const pathname = usePathname();
  const { favorites } = useFavorites();

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQueryState('');
    setSearchResults([]);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTags([]);
  }, []);

  // Reset search query when pathname (route) changes
  useEffect(() => {
    clearSearch();
  }, [pathname, clearSearch]);

  useEffect(() => {
    // Handle search logic and default display logic in a single effect
    if (!searchQuery || searchQuery.trim() === '') {
      // No search query - show appropriate default results
      if (pathname === '/favorites') {
        // On favorites page, show all favorites when no search
        setSearchResults(favorites);
      } else {
        // On other pages, show no results when no search
        setSearchResults([]);
      }
      return;
    }

    // There is a search query - perform search
    const query = searchQuery.toLowerCase();

    // Use favorites as the search source when on /favorites page
    const searchSource =
      pathname === '/favorites' ? favorites : getAllResources();

    let results = searchSource.filter(
      (resource) =>
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.section.toLowerCase().includes(query)
    );

    if (currentCategory) {
      results = results.filter(
        (resource) => resource.section === currentCategory
      );
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      results = results.filter(
        (resource) => {
          const resourceTags = (resource as any).tags;
          return resourceTags && Array.isArray(resourceTags) && 
                 selectedTags.some(tag => resourceTags.includes(tag));
        }
      );
    }

    setSearchResults(results);
  }, [searchQuery, currentCategory, pathname, favorites, selectedTags]);

  const contextValue = React.useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchResults,
      clearSearch,
      currentCategory,
      setCurrentCategory,
      selectedTags,
      setSelectedTags,
      clearFilters,
    }),
    [
      searchQuery,
      searchResults,
      setSearchQuery,
      clearSearch,
      currentCategory,
      setCurrentCategory,
      selectedTags,
      setSelectedTags,
      clearFilters,
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
