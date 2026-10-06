// The bookmarks view: everything the visitor saved, grouped by section and
// ordered the way the site orders its sections. Client-only — it reads
// localStorage through BookmarksProvider.
'use client';

import { useId, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/contexts/bookmarks-context';
import {
  groupBySection,
  toSectionId,
} from '@/lib/utils/navigation';
import {
  filterResources,
  isFiltering,
  resultSummary,
} from '@/lib/utils/search';
import ResourceGrid from '@/components/ui/resource-grid';
import { useSearch } from '@/contexts/search-context';
import type { Resource } from '@/lib/types';

/**
 * Clear All, behind a confirmation in a native <dialog>. showModal() does what
 * a dialog library would: the dialog sits above the whole page, the page
 * behind it is inert, Escape closes it, and focus moves to its first button
 * (Cancel, the safe choice) and back to this one when it closes. A click on
 * the backdrop does nothing, as an alert dialog should. The page's scroll is
 * held still by a rule in app/globals.css.
 */
const ClearAllButton = ({ onConfirm }: { onConfirm: () => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="
          cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md 
          border border-border/50 
          text-muted-foreground hover:text-foreground 
          bg-background hover:bg-muted/50 
          transition-all duration-200 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          hover:border-border/80
          shadow-sm hover:shadow-md
          disabled:pointer-events-none disabled:opacity-50
        "
        aria-label="Clear all bookmarks"
        aria-haspopup="dialog"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Clear All
      </button>

      {/* Tailwind's preflight zeroes every margin, so m-auto restores the
          centring the browser gives a modal dialog. The dialog sets no
          display of its own: that would show it while closed. The backdrop's
          colour is a literal, not a theme colour: those are custom
          properties, which ::backdrop only inherits in browsers from around
          2024 on, and an older one would leave the page undimmed. */}
      <dialog
        ref={dialogRef}
        role="alertdialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="m-auto w-full max-w-lg border bg-background p-6 text-foreground shadow-lg backdrop:bg-[rgb(0_0_0/0.8)] sm:rounded-lg"
      >
        <div className="grid gap-4">
          <div className="flex flex-col space-y-2 text-center sm:text-left">
            <h2 id={titleId} className="text-lg font-semibold">
              Clear All Bookmarks
            </h2>
            <p
              id={descriptionId}
              className="text-sm text-muted-foreground"
            >
              Are you sure you want to clear all your bookmarks? This
              action cannot be undone.
            </p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button
              type="button"
              onClick={close}
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent-neon dark:hover:text-primary-foreground hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                close();
                onConfirm();
              }}
              className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Clear All
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

const BookmarksHeader = ({
  query,
  filtering,
  displayedBookmarks,
  bookmarks,
  onClearAll,
}: {
  query: string;
  filtering: boolean;
  displayedBookmarks: Resource[];
  bookmarks: Resource[];
  onClearAll: () => void;
}) => {
  const getDescription = () => {
    if (filtering) {
      return resultSummary(
        displayedBookmarks.length,
        query,
        'bookmark',
      );
    }

    return bookmarks.length === 0
      ? "You haven't added any bookmarks yet."
      : `You have ${bookmarks.length} ${
          bookmarks.length === 1 ? 'bookmark' : 'bookmarks'
        }.`;
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          My Bookmarks
        </h1>
        <p className="text-muted-foreground">{getDescription()}</p>
      </div>

      {bookmarks.length > 0 && (
        <ClearAllButton onConfirm={onClearAll} />
      )}
    </div>
  );
};

const EmptyState = ({ filtering }: { filtering: boolean }) => (
  <div className="py-12 text-center">
    <p className="text-lg mb-6">
      {filtering
        ? "Try adjusting your search terms to find what you're looking for."
        : 'Bookmark resources to add them to your bookmarks list.'}
    </p>
    <Link
      href="/"
      className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ring-offset-background disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent/10 h-10 px-4 py-2 rounded-full border-accent-neon text-accent-neon focus-visible:ring-accent-neon hover:text-accent-neon/80"
    >
      Explore Resources
    </Link>
  </div>
);

const BookmarksSection = ({
  section,
  bookmarks,
}: {
  section: string;
  bookmarks: Resource[];
}) => (
  <section id={toSectionId(section)} className="space-y-6">
    <h2 className="text-2xl font-bold tracking-tight">{section}</h2>
    <ResourceGrid resources={bookmarks} />
  </section>
);

export function BookmarksView() {
  const { bookmarks, clearBookmarks } = useBookmarks();
  const { deferredQuery, selectedTags } = useSearch();

  const filtering = isFiltering(deferredQuery, selectedTags);

  const displayedBookmarks = useMemo(
    () => filterResources(bookmarks, deferredQuery, selectedTags),
    [bookmarks, deferredQuery, selectedTags],
  );

  const groupedBookmarks = useMemo(
    () => groupBySection(displayedBookmarks),
    [displayedBookmarks],
  );

  return (
    <div className="container mx-auto md:mt-20 mt-8 py-12 space-y-12">
      <BookmarksHeader
        query={deferredQuery}
        filtering={filtering}
        displayedBookmarks={displayedBookmarks}
        bookmarks={bookmarks}
        onClearAll={clearBookmarks}
      />

      {displayedBookmarks.length === 0 ? (
        <EmptyState filtering={filtering} />
      ) : (
        <div className="space-y-16">
          {groupedBookmarks.map(([section, sectionBookmarks]) => (
            <BookmarksSection
              key={section}
              section={section}
              bookmarks={sectionBookmarks}
            />
          ))}
        </div>
      )}
    </div>
  );
}
