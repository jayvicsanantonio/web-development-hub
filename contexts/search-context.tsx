// Search and tag-filter state shared by the header input, the filter panel and
// every page that renders results.
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
import { SECTIONS } from '@/constants/sections';
import type { Resource } from '@/lib/types';
import { useBookmarks } from './bookmarks-context';
import { useFilter } from '@/hooks/useFilter';

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

  // Filter panel state
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: (isOpen: boolean) => void;
  toggleFilterPanel: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

// Flattened once at module load. SECTIONS is static, and rebuilding this list
// inside the search meant allocating an object per resource on every keystroke.
const ALL_RESOURCES: Resource[] = SECTIONS.flatMap((section) =>
  section.links.map((link) => ({
    title: link.title,
    href: link.href,
    description: link.description,
    section: section.title,
    tags: link.tags,
  }))
);

const matchesQuery = (resource: Resource, query: string) =>
  resource.title.toLowerCase().includes(query) ||
  resource.description.toLowerCase().includes(query) ||
  resource.section.toLowerCase().includes(query);

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<
    string | null
  >(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const pathname = usePathname();
  const { bookmarks } = useBookmarks();

  const {
    selectedTags,
    toggleTag,
    isTagSelected,
    clearAllTags: clearFilters,
    hasSelectedTags,
    filterResourcesByTags,
  } = useFilter();

  // Keeps typing responsive while the scan over every resource runs at a lower
  // priority, without a timer to clean up.
  const deferredQuery = useDeferredValue(searchQuery);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const toggleFilterPanel = useCallback(() => {
    setIsFilterPanelOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    clearSearch();
  }, [pathname, clearSearch]);

  // Derived rather than stored: an effect writing this into state ran a render
  // behind the query and needed its dependencies kept in sync by hand.
  const searchResults = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase();
    const isBookmarksPage = pathname === '/bookmarks';
    const source = isBookmarksPage ? bookmarks : ALL_RESOURCES;

    if (!query) {
      // An empty result list means "not searching" to every consumer, so with
      // nothing typed only the bookmarks page and an active tag produce rows.
      if (!isBookmarksPage && selectedTags.length === 0) {
        return [];
      }
      return filterResourcesByTags(source);
    }

    let results = source.filter((resource) =>
      matchesQuery(resource, query)
    );

    if (currentCategory) {
      results = results.filter(
        (resource) => resource.section === currentCategory
      );
    }

    return filterResourcesByTags(results);
  }, [
    deferredQuery,
    currentCategory,
    pathname,
    bookmarks,
    selectedTags,
    filterResourcesByTags,
  ]);

  const contextValue = useMemo(
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

      // Filter panel state
      isFilterPanelOpen,
      setIsFilterPanelOpen,
      toggleFilterPanel,
    }),
    [
      searchQuery,
      searchResults,
      clearSearch,
      currentCategory,

      selectedTags,
      toggleTag,
      isTagSelected,
      clearFilters,
      hasSelectedTags,

      // Filter panel dependencies
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
