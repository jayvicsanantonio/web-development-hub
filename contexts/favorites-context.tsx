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

type FavoritesContextType = {
  favorites: Resource[];
  addFavorite: (resource: Resource) => void;
  removeFavorite: (href: string) => void;
  isFavorite: (href: string) => boolean;
  clearFavorites: () => void;
  isLoading: boolean;
};

const LOCAL_STORAGE_KEY = 'web-dev-hub-favorites';

const createResourceMap = (): Map<
  string,
  Map<string, string>
> => {
  const resourceMap = new Map();

  SECTIONS.forEach((section) => {
    const sectionMap = new Map<
      string,
      string
    >();

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

const getSerializableFavorites = (
  favorites: Resource[]
): Omit<Resource, 'iconName'>[] => {
  return favorites.map(({ iconName, ...rest }) => rest);
};

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const resourceMap = useMemo(() => createResourceMap(), []);

  const restoreIcons = useCallback(
    (favItems: Resource[]): Resource[] => {
      return favItems.map((fav) => {
        const sectionMap = resourceMap.get(fav.section);
        const icon = sectionMap?.get(fav.href);

        return icon ? { ...fav, icon } : fav;
      });
    },
    [resourceMap]
  );

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);

      try {
        const storedFavorites =
          localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!storedFavorites) {
          setFavorites([]);
          return;
        }

        const parsedFavorites = JSON.parse(storedFavorites);

        if (!Array.isArray(parsedFavorites)) {
                  if (process.env.NODE_ENV === 'development') {
          console.error(
            'Stored favorites is not an array:',
            parsedFavorites
          );
        }
          setFavorites([]);
          return;
        }

        const validFavorites =
          parsedFavorites.filter(validateResource);
        const favoritesWithIcons = restoreIcons(validFavorites);

        setFavorites(favoritesWithIcons);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading favorites:', error);
        }
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [restoreIcons]);

  useEffect(() => {
    if (isLoading) return;

    try {
      const serializableFavorites =
        getSerializableFavorites(favorites);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(serializableFavorites)
      );
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          'Failed to save favorites to localStorage:',
          error
        );
      }
    }
  }, [favorites, isLoading]);

  const addFavorite = useCallback((resource: Resource) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.href === resource.href);
      return exists ? prev : [...prev, resource];
    });
  }, []);

  const removeFavorite = useCallback((href: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.href !== href));
  }, []);

  const isFavorite = useCallback(
    (href: string) => favorites.some((fav) => fav.href === href),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      clearFavorites,
      isLoading,
    }),
    [
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      clearFavorites,
      isLoading,
    ]
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
    throw new Error(
      'useFavorites must be used within a FavoritesProvider'
    );
  }

  return context;
}
