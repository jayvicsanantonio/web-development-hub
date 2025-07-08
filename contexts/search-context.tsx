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
import { useFilter } from '@/hooks/useFilter';

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

  // Tag filtering methods from useFilter hook
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  isTagSelected: (tag: string) => boolean;
  clearFilters: () => void;
  hasSelectedTags: boolean;
  selectedTagCount: number;
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
  const pathname = usePathname();
  const { favorites } = useFavorites();

  // Use the filter hook for tag filtering logic
  const {
    selectedTags,
    toggleTag,
    isTagSelected,
    clearAllTags: clearFilters,
    hasSelectedTags,
    selectedTagCount,
    filterResourcesByTags,
  } = useFilter({});

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQueryState('');
    setSearchResults([]);
  }, []);

  // Reset search query when pathname (route) changes
  useEffect(() => {
    clearSearch();
  }, [pathname, clearSearch]);

  useEffect(() => {
    // Handle search logic and default display logic in a single effect
    if (!searchQuery || searchQuery.trim() === '') {
      // No search query - show appropriate default results
      let results;

      // Determine data source based on pathname
      if (pathname === '/favorites') {
        // On favorites page, use favorites as source
        results = favorites;
      } else if (selectedTags.length > 0) {
        // If tags are selected but no search query, show all resources
        results = getAllResources();
      } else {
        // No search query, no tags, not on favorites - show no results
        setSearchResults([]);
        return;
      }

      // Apply tag filters if any tags are selected
      if (selectedTags.length > 0) {
        results = filterResourcesByTags(results);
      }

      setSearchResults(results);
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

    // Apply tag filters using our filter hook's logic
    if (selectedTags.length > 0) {
      results = filterResourcesByTags(results);
    }

    setSearchResults(results);
  }, [
    searchQuery,
    currentCategory,
    pathname,
    favorites,
    selectedTags,
  ]);

  const contextValue = React.useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchResults,
      clearSearch,
      currentCategory,
      setCurrentCategory,
      // Tag filter related props from useFilter hook
      selectedTags,
      toggleTag,
      isTagSelected,
      clearFilters,
      hasSelectedTags,
      selectedTagCount,
    }),
    [
      searchQuery,
      searchResults,
      setSearchQuery,
      clearSearch,
      currentCategory,
      setCurrentCategory,
      // Tag filter related dependencies
      selectedTags,
      toggleTag,
      isTagSelected,
      clearFilters,
      hasSelectedTags,
      selectedTagCount,
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
