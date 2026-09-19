// The bookmarks view: everything the visitor saved, grouped by section and
// ordered the way the site orders its sections. Client-only — it reads
// localStorage through BookmarksProvider.
'use client';

import { useMemo } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const BookmarksHeader = ({
  searchQuery,
  filtering,
  displayedBookmarks,
  bookmarks,
  onClearAll,
}: {
  searchQuery: string;
  filtering: boolean;
  displayedBookmarks: Resource[];
  bookmarks: Resource[];
  onClearAll: () => void;
}) => {
  const getDescription = () => {
    if (filtering) {
      return resultSummary(
        displayedBookmarks.length,
        searchQuery,
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="
                cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md 
                border border-border/50 
                text-muted-foreground hover:text-foreground 
                bg-background hover:bg-muted/50 
                transition-all duration-200 ease-in-out
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                hover:border-border/80
                shadow-sm hover:shadow-md
                transform-gpu
                disabled:pointer-events-none disabled:opacity-50
              "
              aria-label="Clear all bookmarks"
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
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All Bookmarks</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to clear all your bookmarks?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onClearAll}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
  const { searchQuery, deferredQuery, selectedTags } = useSearch();

  const filtering = isFiltering(deferredQuery, selectedTags);

  const displayedBookmarks = useMemo(
    () => filterResources(bookmarks, deferredQuery, selectedTags),
    [bookmarks, deferredQuery, selectedTags],
  );

  const groupedBookmarks = useMemo(
    () => groupBySection(displayedBookmarks),
    [displayedBookmarks],
  );

  const handleClearAll = () => {
    clearBookmarks();
  };

  return (
    <div className="container mx-auto md:mt-20 mt-8 py-12 space-y-12">
      <BookmarksHeader
        searchQuery={searchQuery}
        filtering={filtering}
        displayedBookmarks={displayedBookmarks}
        bookmarks={bookmarks}
        onClearAll={handleClearAll}
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
