// Bookmarks, saved by resource id in the store lib/bookmarks-store.ts keeps
// in localStorage. Every other field is resolved from the dataset, so a
// bookmark always shows the resource as the site currently describes it.
'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { ALL_RESOURCES } from '@/constants/sections';
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  updateEntries,
} from '@/lib/bookmarks-store';
import type { Resource } from '@/lib/types';

type BookmarksContextType = {
  /** The saved resources the dataset still has, in the order saved. */
  bookmarks: Resource[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  /** Removes every saved entry, including any no longer shown. */
  clearBookmarks: () => void;
};

const RESOURCE_BY_ID = new Map(
  ALL_RESOURCES.map((resource) => [resource.id, resource]),
);

// The changes go straight to the store, which tells every subscriber, so they
// need nothing from a render and are the same functions throughout.
function addBookmark(id: string) {
  updateEntries((current) =>
    current.includes(id) ? current : [...current, id],
  );
}

function removeBookmark(id: string) {
  updateEntries((current) => current.filter((entry) => entry !== id));
}

function clearBookmarks() {
  updateEntries(() => []);
}

const BookmarksContext = createContext<
  BookmarksContextType | undefined
>(undefined);

export function BookmarksProvider({
  children,
}: {
  children: ReactNode;
}) {
  const entries = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const saved = useMemo(() => new Set(entries), [entries]);

  const bookmarks = useMemo(
    () => entries.flatMap((entry) => RESOURCE_BY_ID.get(entry) ?? []),
    [entries],
  );

  const isBookmarked = useCallback(
    (id: string) => saved.has(id),
    [saved],
  );

  const contextValue = useMemo(
    () => ({
      bookmarks,
      addBookmark,
      removeBookmark,
      isBookmarked,
      clearBookmarks,
    }),
    [bookmarks, isBookmarked],
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
      'useBookmarks must be used within a BookmarksProvider',
    );
  }

  return context;
}
