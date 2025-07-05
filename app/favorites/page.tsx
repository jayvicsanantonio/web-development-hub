'use client';

import { useEffect, useState } from 'react';
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

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const { searchQuery, searchResults, setCurrentCategory } =
    useSearch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);

  const displayedFavorites =
    searchQuery && searchQuery.trim() ? searchResults : favorites;

  const groupedFavorites = displayedFavorites.reduce(
    (acc, favorite) => {
      if (!acc[favorite.section]) {
        acc[favorite.section] = [];
      }
      acc[favorite.section].push(favorite);
      return acc;
    },
    {} as Record<string, typeof displayedFavorites>
  );

  const sectionOrder = [
    'Learning Resources',
    'Developer Tools',
    'Frameworks and Libraries',
    'Communities',
    'Blogs',
  ];

  return (
    <div className="container mx-auto md:mt-20 mt-8 py-12 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            My Favorites
          </h1>
          <p className="text-foreground-muted">
            {searchQuery && searchQuery.trim()
              ? displayedFavorites.length === 0
                ? `No favorites found for "${searchQuery}"`
                : `Found ${displayedFavorites.length} favorite${
                    displayedFavorites.length === 1 ? '' : 's'
                  } for "${searchQuery}"`
              : favorites.length === 0
              ? "You haven't added any favorites yet."
              : `You have ${favorites.length} favorite resource${
                  favorites.length === 1 ? '' : 's'
                }.`}
          </p>
        </div>

        {favorites.length > 0 && (
          <AlertDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
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
                <AlertDialogTitle>
                  Clear All Favorites
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear all your favorites?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => clearFavorites()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {displayedFavorites.length === 0 ? (
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
      ) : (
        <div className="space-y-16">
          {sectionOrder
            .filter((section) => groupedFavorites[section])
            .map((section) => (
              <section
                id={`section-${section
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                key={section}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold tracking-tight">
                  {section}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedFavorites[section].map((favorite) => (
                    <ResourceCard
                      key={favorite.href}
                      resource={favorite}
                      accentColor={
                        section === 'Learning Resources' ||
                        section === 'Frameworks and Libraries' ||
                        section === 'Blogs'
                          ? 'neon'
                          : 'purple'
                      }
                    />
                  ))}
                </div>
              </section>
            ))}
        </div>
      )}
    </div>
  );
}
