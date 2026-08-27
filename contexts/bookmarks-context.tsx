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
import { SECTIONS } from '@/constants/sections';

export type Resource = {
  title: string;
  href: string;
  description: string;
  section: string;
};

type BookmarksContextType = {
  bookmarks: Resource[];
  addBookmark: (resource: Resource) => void;
  removeBookmark: (href: string) => void;
  isBookmarked: (href: string) => boolean;
  clearBookmarks: () => void;
  isLoading: boolean;
};

const LOCAL_STORAGE_KEY = 'web-dev-hub-bookmarks';

// Titles are unique across all 215 links; hrefs are not (the AI SDK is listed
// twice), so the section index is keyed by title.
const SECTION_BY_TITLE = new Map<string, string>(
  SECTIONS.flatMap((section) =>
    section.links.map(
      (link) => [link.title, section.title] as [string, string]
    )
  )
);

const withCanonicalSection = (resource: Resource): Resource => {
  const section = SECTION_BY_TITLE.get(resource.title);
  return section && section !== resource.section
    ? { ...resource, section }
    : resource;
};

const validateResource = (
  resource: unknown
): resource is Resource => {
  if (typeof resource !== 'object' || resource === null) {
    return false;
  }
  const candidate = resource as Record<string, unknown>;
  return (
    typeof candidate.title === 'string' &&
    typeof candidate.href === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.section === 'string'
  );
};

const BookmarksContext = createContext<
  BookmarksContextType | undefined
>(undefined);

export function BookmarksProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookmarks, setBookmarks] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBookmarks = async () => {
      setIsLoading(true);

      try {
        const storedBookmarks =
          localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!storedBookmarks) {
          setBookmarks([]);
          return;
        }

        const parsedBookmarks = JSON.parse(storedBookmarks);

        if (!Array.isArray(parsedBookmarks)) {
          console.error(
            'Stored bookmarks is not an array:',
            parsedBookmarks
          );
          setBookmarks([]);
          return;
        }

        const validBookmarks = parsedBookmarks
          .filter(validateResource)
          .map(withCanonicalSection);

        setBookmarks(validBookmarks);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
        setBookmarks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(bookmarks)
      );
    } catch (error) {
      console.error(
        'Failed to save bookmarks to localStorage:',
        error
      );
    }
  }, [bookmarks, isLoading]);

  const addBookmark = useCallback((resource: Resource) => {
    const canonical = withCanonicalSection(resource);
    setBookmarks((prev) => {
      const exists = prev.some(
        (bookmark) => bookmark.href === canonical.href
      );
      return exists ? prev : [...prev, canonical];
    });
  }, []);

  const removeBookmark = useCallback((href: string) => {
    setBookmarks((prev) =>
      prev.filter((bookmark) => bookmark.href !== href)
    );
  }, []);

  const isBookmarked = useCallback(
    (href: string) =>
      bookmarks.some((bookmark) => bookmark.href === href),
    [bookmarks]
  );

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
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
