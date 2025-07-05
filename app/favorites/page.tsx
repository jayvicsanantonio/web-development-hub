'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/contexts/favorites-context';
import ResourceCard from '@/components/ui/resource-card';
import { useSearch } from '@/contexts/search-context';
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

// Constants
const SECTION_ORDER = [
  'Learning Resources',
  'Developer Tools',
  'Frameworks and Libraries',
  'Communities',
  'Blogs',
] as const;

const ACCENT_COLORS = {
  'Learning Resources': 'neon',
  'Frameworks and Libraries': 'neon',
  Blogs: 'neon',
} as const;

// Utility functions
const getAccentColor = (section: string): 'neon' | 'purple' => {
  return (
    (ACCENT_COLORS as Record<string, 'neon' | 'purple'>)[section] ||
    'purple'
  );
};

const formatCount = (
  count: number,
  singular: string,
  plural: string
): string => {
  return `${count} ${count === 1 ? singular : plural}`;
};

const createSectionId = (section: string): string => {
  return `section-${section.toLowerCase().replace(/\s+/g, '-')}`;
};

// Components
const FavoritesHeader = ({
  searchQuery,
  displayedFavorites,
  favorites,
  onClearAll,
}: {
  searchQuery: string;
  displayedFavorites: any[];
  favorites: any[];
  onClearAll: () => void;
}) => {
  const getDescription = () => {
    if (searchQuery && searchQuery.trim()) {
      return displayedFavorites.length === 0
        ? `No favorites found for "${searchQuery}"`
        : `Found ${formatCount(
            displayedFavorites.length,
            'favorite',
            'favorites'
          )} for "${searchQuery}"`;
    }

    return favorites.length === 0
      ? "You haven't added any favorites yet."
      : `You have ${formatCount(
          favorites.length,
          'favorite resource',
          'favorite resources'
        )}.`;
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          My Favorites
        </h1>
        <p className="text-foreground-muted">{getDescription()}</p>
      </div>

      {favorites.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="px-4 py-2 rounded-md border border-border text-foreground-muted hover:bg-background-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon"
              aria-label="Clear all favorites"
            >
              Clear All
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All Favorites</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to clear all your favorites?
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

const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <div className="py-12 text-center">
    <p className="text-lg mb-6">
      {searchQuery && searchQuery.trim()
        ? "Try adjusting your search terms to find what you're looking for."
        : 'Bookmark resources to add them to your favorites list.'}
    </p>
    <Link
      href="/"
      className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ring-offset-background disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent/10 h-10 px-4 py-2 rounded-full border-accent-neon text-accent-neon focus-visible:ring-accent-neon hover:text-accent-neon/80"
    >
      Explore Resources
    </Link>
  </div>
);

const FavoritesSection = ({
  section,
  favorites,
}: {
  section: string;
  favorites: any[];
}) => (
  <section id={createSectionId(section)} className="space-y-6">
    <h2 className="text-2xl font-bold tracking-tight">{section}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((favorite) => (
        <ResourceCard
          key={favorite.href}
          resource={favorite}
          accentColor={getAccentColor(section)}
        />
      ))}
    </div>
  </section>
);

// Main component
export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const { searchQuery, searchResults, setCurrentCategory } =
    useSearch();

  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);

  const displayedFavorites = useMemo(() => {
    return searchQuery && searchQuery.trim()
      ? searchResults
      : favorites;
  }, [searchQuery, searchResults, favorites]);

  const groupedFavorites = useMemo(() => {
    return displayedFavorites.reduce((acc, favorite) => {
      if (!acc[favorite.section]) {
        acc[favorite.section] = [];
      }
      acc[favorite.section].push(favorite);
      return acc;
    }, {} as Record<string, typeof displayedFavorites>);
  }, [displayedFavorites]);

  const handleClearAll = () => {
    clearFavorites();
  };

  return (
    <div className="container mx-auto md:mt-20 mt-8 py-12 space-y-12">
      <FavoritesHeader
        searchQuery={searchQuery}
        displayedFavorites={displayedFavorites}
        favorites={favorites}
        onClearAll={handleClearAll}
      />

      {displayedFavorites.length === 0 ? (
        <EmptyState searchQuery={searchQuery} />
      ) : (
        <div className="space-y-16">
          {SECTION_ORDER.filter(
            (section) => groupedFavorites[section]
          ).map((section) => (
            <FavoritesSection
              key={section}
              section={section}
              favorites={groupedFavorites[section]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
