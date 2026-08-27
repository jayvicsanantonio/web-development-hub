'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { SECTIONS } from '@/constants/sections';
import { useBookmarks } from './bookmarks-context';
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
  /** `null` means "not searching"; `[]` means "searched, no matches". */
  searchResults: Resource[] | null;
  clearSearch: () => void;
  currentCategory: string | null;
  setCurrentCategory: (category: string | null) => void;

  selectedTags: string[];
  toggleTag: (tag: string) => void;
  isTagSelected: (tag: string) => boolean;
  clearFilters: () => void;
  hasSelectedTags: boolean;
  selectedTagCount: number;

  // Filter panel state
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: (isOpen: boolean) => void;
  toggleFilterPanel: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

// SECTIONS is a static module-level literal, so this is computed once rather
// than rebuilt on every keystroke.
const ALL_RESOURCES: Resource[] = SECTIONS.flatMap((section) =>
  section.links.map((link) => ({
    title: link.title,
    href: link.href,
    description: link.description,
    section: section.title,
    tags: link.tags,
  }))
);

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchQuery, setSearchQueryState] = useState('');
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
    selectedTagCount,
    filterResourcesByTags,
  } = useFilter();

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQueryState('');
  }, []);

  const toggleFilterPanel = useCallback(() => {
    setIsFilterPanelOpen((prev) => !prev);
  }, []);

  // Reset the query when the route changes. Done during render (React's
  // documented "adjusting state when a prop changes" pattern) rather than in an
  // effect: an effect would commit one frame showing the previous page's query.
  const [queryPathname, setQueryPathname] = useState(pathname);
  if (queryPathname !== pathname) {
    setQueryPathname(pathname);
    setSearchQueryState('');
  }

  // Derived during render rather than stored in state: storing it meant every
  // keystroke committed one frame pairing the new query with the old results.
  const searchResults = useMemo<Resource[] | null>(() => {
    const query = searchQuery.trim().toLowerCase();
    const isSearching = query.length > 0 || selectedTags.length > 0;

    if (!isSearching) {
      return null;
    }

    // Bookmarks satisfy Resource (tags is optional), and carry tags at runtime.
    let results: Resource[] =
      pathname === '/bookmarks' ? bookmarks : ALL_RESOURCES;

    if (query) {
      results = results.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.section.toLowerCase().includes(query)
      );
    }

    // Applied in every branch, so tag-only filtering stays scoped to the
    // category page the user is on.
    if (currentCategory) {
      results = results.filter(
        (resource) => resource.section === currentCategory
      );
    }

    if (selectedTags.length > 0) {
      results = filterResourcesByTags(results);
    }

    return results;
  }, [
    searchQuery,
    currentCategory,
    pathname,
    bookmarks,
    selectedTags,
    filterResourcesByTags,
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

      // Filter panel state
      isFilterPanelOpen,
      setIsFilterPanelOpen,
      toggleFilterPanel,
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

      // Filter panel dependencies
      isFilterPanelOpen,
      setIsFilterPanelOpen,
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
