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
import { Icon } from '@iconify/react';
import { getResourceIcon } from '@/lib/data/resource-mappings';

export type Resource = {
  title: string;
  href: string;
  description: string;
  section: string;
  iconName?: string;
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

const createResourceMap = (): Map<string, Map<string, string>> => {
  const resourceMap = new Map();

  SECTIONS.forEach((section) => {
    const sectionMap = new Map<string, string>();

    section.links.forEach((link) => {
      if (link.href && link.title) {
        sectionMap.set(link.href, getResourceIcon(link.title));
      }
    });

    if (sectionMap.size > 0) {
      resourceMap.set(section.title, sectionMap);
    }
  });

  return resourceMap;
};

const validateResource = (resource: any): resource is Resource => {
  return (
    resource &&
    typeof resource.title === 'string' &&
    typeof resource.href === 'string' &&
    typeof resource.description === 'string' &&
    typeof resource.section === 'string'
  );
};

const getSerializableBookmarks = (
  bookmarks: Resource[]
): Omit<Resource, 'iconName'>[] => {
  return bookmarks.map(({ iconName, ...rest }) => rest);
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

  const resourceMap = useMemo(() => createResourceMap(), []);

  const restoreIcons = useCallback(
    (bookmarkItems: Resource[]): Resource[] => {
      return bookmarkItems.map((bookmark) => {
        const sectionMap = resourceMap.get(bookmark.section);
        const icon = sectionMap?.get(bookmark.href);

        return icon ? { ...bookmark, icon } : bookmark;
      });
    },
    [resourceMap]
  );

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

        const validBookmarks =
          parsedBookmarks.filter(validateResource);
        const bookmarksWithIcons = restoreIcons(validBookmarks);

        setBookmarks(bookmarksWithIcons);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
        setBookmarks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookmarks();
  }, [restoreIcons]);

  useEffect(() => {
    if (isLoading) return;

    try {
      const serializableBookmarks =
        getSerializableBookmarks(bookmarks);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(serializableBookmarks)
      );
    } catch (error) {
      console.error(
        'Failed to save bookmarks to localStorage:',
        error
      );
    }
  }, [bookmarks, isLoading]);

  const addBookmark = useCallback((resource: Resource) => {
    setBookmarks((prev) => {
      const exists = prev.some(
        (bookmark) => bookmark.href === resource.href
      );
      return exists ? prev : [...prev, resource];
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
