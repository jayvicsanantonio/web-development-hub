'use client';

import { useEffect } from 'react';
import { useFavorites } from '@/contexts/favorites-context';
import ResourceCard from '@/components/ui/resource-card';
import { useSearch } from '@/contexts/search-context';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();
  const { setCurrentCategory } = useSearch();
  
  // Reset any category filter when visiting favorites
  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);
  
  // Group favorites by section
  const groupedFavorites = favorites.reduce((acc, favorite) => {
    if (!acc[favorite.section]) {
      acc[favorite.section] = [];
    }
    acc[favorite.section].push(favorite);
    return acc;
  }, {} as Record<string, typeof favorites>);
  
  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">My Favorites</h1>
          <p className="text-foreground-muted">
            {favorites.length === 0 
              ? "You haven't added any favorites yet." 
              : `You have ${favorites.length} favorite resource${favorites.length === 1 ? '' : 's'}.`}
          </p>
        </div>
        
        {favorites.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all favorites?')) {
                clearFavorites();
              }
            }}
            className="px-4 py-2 rounded-md border border-border text-foreground-muted hover:bg-background-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon"
            aria-label="Clear all favorites"
          >
            Clear All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg mb-6">
            Bookmark resources to add them to your favorites list.
          </p>
          <a 
            href="/"
            className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ring-offset-background disabled:pointer-events-none disabled:opacity-50 border hover:bg-accent/10 h-10 px-4 py-2 rounded-full border-accent-neon text-accent-neon focus-visible:ring-accent-neon hover:text-accent-neon/80"
          >
            Explore Resources
          </a>
        </div>
      ) : (
        <div className="space-y-16">
          {Object.entries(groupedFavorites).map(([section, sectionFavorites]) => (
            <section key={section} className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">{section}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionFavorites.map((favorite) => (
                  <ResourceCard
                    key={favorite.href}
                    resource={favorite}
                    accentColor={
                      section === 'Learning Resources' || 
                      section === 'Frameworks & Libraries' || 
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
