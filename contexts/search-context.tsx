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


  useEffect(() => {
    clearSearch();
  }, [pathname, clearSearch]);

  useEffect(() => {

    if (!searchQuery || searchQuery.trim() === '') {

      let results;


      if (pathname === '/favorites') {

        results = favorites;
      } else if (selectedTags.length > 0) {

        results = getAllResources();
      } else {

        setSearchResults([]);
        return;
      }


      if (selectedTags.length > 0) {
        results = filterResourcesByTags(results);
      }

      setSearchResults(results);
      return;
    }


    const query = searchQuery.toLowerCase();


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
