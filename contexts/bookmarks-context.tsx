// Bookmarks, persisted to localStorage as the hrefs the visitor saved. Every
// other field is resolved from the dataset, so a bookmark always shows the
// resource as the site currently describes it.
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { ALL_RESOURCES } from '@/constants/sections';
import type { Resource } from '@/lib/types';

type BookmarksContextType = {
  bookmarks: Resource[];
  addBookmark: (href: string) => void;
  removeBookmark: (href: string) => void;
  isBookmarked: (href: string) => boolean;
  clearBookmarks: () => void;
  isLoading: boolean;
};

const LOCAL_STORAGE_KEY = 'web-dev-hub-bookmarks';

const RESOURCE_BY_HREF = new Map(
  ALL_RESOURCES.map((resource) => [resource.href, resource])
);

/**
 * The saved hrefs in a parsed storage value. Entries may be hrefs or objects
 * carrying one, since both shapes exist in visitors' storage. Anything else,
 * and any href the dataset no longer has, is dropped.
 */
function parseStoredBookmarks(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const hrefs = value
    .map((entry) =>
      typeof entry === 'string'
        ? entry
        : (entry as { href?: unknown } | null)?.href
    )
    .filter(
      (href): href is string =>
        typeof href === 'string' && RESOURCE_BY_HREF.has(href)
    );

  return [...new Set(hrefs)];
}

const BookmarksContext = createContext<
  BookmarksContextType | undefined
>(undefined);

export function BookmarksProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hrefs, setHrefs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      setHrefs(stored ? parseStoredBookmarks(JSON.parse(stored)) : []);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(hrefs));
    } catch (error) {
      console.error(
        'Failed to save bookmarks to localStorage:',
        error
      );
    }
  }, [hrefs, isLoading]);

  const bookmarks = useMemo(
    () => hrefs.flatMap((href) => RESOURCE_BY_HREF.get(href) ?? []),
    [hrefs]
  );

  const addBookmark = useCallback((href: string) => {
    setHrefs((prev) => (prev.includes(href) ? prev : [...prev, href]));
  }, []);

  const removeBookmark = useCallback((href: string) => {
    setHrefs((prev) => prev.filter((saved) => saved !== href));
  }, []);

  const isBookmarked = useCallback(
    (href: string) => hrefs.includes(href),
    [hrefs]
  );

  const clearBookmarks = useCallback(() => {
    setHrefs([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      bookmarks,
      addBookmark,
      removeBookmark,
      isBookmarked,
      clearBookmarks,
      isLoading,
    }),
    [
      bookmarks,
      addBookmark,
      removeBookmark,
      isBookmarked,
      clearBookmarks,
      isLoading,
    ]
  );

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);

  if (context === undefined) {
    throw new Error(
      'useBookmarks must be used within a BookmarksProvider'
    );
  }

  return context;
}
