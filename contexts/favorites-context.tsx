'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { SECTIONS } from '@/constants/sections';

type Resource = {
  title: string;
  href: string;
  description: string;
  section: string;
  icon?: React.FC<{ className?: string }>;
};

type FavoritesContextType = {
  favorites: Resource[];
  addFavorite: (resource: Resource) => void;
  removeFavorite: (href: string) => void;
  isFavorite: (href: string) => boolean;
  clearFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = 'web-dev-hub-favorites';

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<Resource[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites);
        
        // Ensure we have the icon components by matching with SECTIONS data
        const favoritesWithIcons = parsedFavorites.map((fav: Resource) => {
          // Find the section that contains this resource
          const section = SECTIONS.find(
            (section) => section.title === fav.section
          );
          
          if (section) {
            // Find the matching link in the section
            const link = section.links.find((link) => link.href === fav.href);
            if (link) {
              return {
                ...fav,
                icon: link.icon,
              };
            }
          }
          return fav;
        });
        
        setFavorites(favoritesWithIcons);
      } catch (error) {
        console.error('Failed to parse favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    // We need to serialize the favorites without the icon component
    const serializableFavorites = favorites.map(({ icon, ...rest }) => rest);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serializableFavorites));
  }, [favorites]);

  const addFavorite = (resource: Resource) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.href === resource.href)) {
        return prev;
      }
      return [...prev, resource];
    });
  };

  const removeFavorite = (href: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.href !== href));
  };

  const isFavorite = (href: string) => {
    return favorites.some((fav) => fav.href === href);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const contextValue = React.useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      clearFavorites,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
