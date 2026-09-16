// What the visitor has asked for: a query, a tag selection, and whether the
// filter panel is open. It holds the request, not the answer — each view
// filters its own list through lib/utils/search.ts, so a page always narrows
// the resources it actually renders.
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  /** The query to filter on; `searchQuery` is what the input shows. */
  deferredQuery: string;
  clearSearch: () => void;

  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;

  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: (isOpen: boolean) => void;
  toggleFilterPanel: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const pathname = usePathname();

  // Keeps typing responsive while the scan over every resource runs at a lower
  // priority, without a timer to clean up.
  const deferredQuery = useDeferredValue(searchQuery);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTags([]);
  }, []);

  const toggleFilterPanel = useCallback(() => {
    setIsFilterPanelOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    clearSearch();
  }, [pathname, clearSearch]);

  const contextValue = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      deferredQuery,
      clearSearch,

      selectedTags,
      toggleTag,
      clearFilters,

      isFilterPanelOpen,
      setIsFilterPanelOpen,
      toggleFilterPanel,
    }),
    [
      searchQuery,
      deferredQuery,
      clearSearch,
      selectedTags,
      toggleTag,
      clearFilters,
      isFilterPanelOpen,
      toggleFilterPanel,
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
