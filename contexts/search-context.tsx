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

const getFavoritesFromStorage = (): Resource[] => {
  try {
    const storedFavorites = localStorage.getItem(
      'web-dev-hub-favorites'
    );
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      if (Array.isArray(parsedFavorites)) {
        return parsedFavorites.filter((fav: any) => {
          return (
            fav &&
            typeof fav.title === 'string' &&
            typeof fav.href === 'string' &&
            typeof fav.description === 'string' &&
            typeof fav.section === 'string'
          );
        });
      }
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
  }
  return [];
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
  const pathname = usePathname();

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);
  const clearSearch = useCallback(() => {
    setSearchQueryState('');
    setSearchResults([]);
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();

    // Use favorites as the search source when on /favorites page
    const searchSource =
      pathname === '/favorites'
        ? getFavoritesFromStorage()
        : getAllResources();

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

    setSearchResults(results);
  }, [searchQuery, currentCategory, pathname]);

  // Set default search results to favorites when on /favorites page
  useEffect(() => {
    if (
      pathname === '/favorites' &&
      (!searchQuery || searchQuery.trim() === '')
    ) {
      const favorites = getFavoritesFromStorage();
      setSearchResults(favorites);
    } else if (pathname !== '/favorites') {
      // Clear search results when not on favorites page and no search query
      if (!searchQuery || searchQuery.trim() === '') {
        setSearchResults([]);
      }
    }
  }, [pathname, searchQuery]);

  const contextValue = React.useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchResults,
      clearSearch,
      currentCategory,
      setCurrentCategory,
    }),
    [
      searchQuery,
      searchResults,
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
