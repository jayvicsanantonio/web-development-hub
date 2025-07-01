'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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
  isLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = 'web-dev-hub-favorites';

type ResourceMap = Map<string, Map<string, React.FC<{ className?: string }>>>;

function createResourceMap(): ResourceMap {
  const resourceMap: ResourceMap = new Map();
  
  try {
    SECTIONS.forEach((section) => {
      const sectionMap = new Map<string, React.FC<{ className?: string }>>();
      
      section.links.forEach((link) => {
        if (link.href && link.icon) {
          sectionMap.set(link.href, link.icon);
        }
      });
      
      if (sectionMap.size > 0) {
        resourceMap.set(section.title, sectionMap);
      }
    });
  } catch (error) {
    console.error('Error creating resource map:', error);
  }
  
  return resourceMap;
}

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const resourceMap = React.useMemo(() => createResourceMap(), []);
  
  const restoreIcons = useCallback((favItems: Resource[]): Resource[] => {
    return favItems.map((fav) => {
      const sectionMap = resourceMap.get(fav.section);
      if (sectionMap) {
        const icon = sectionMap.get(fav.href);
        if (icon) {
          return { ...fav, icon };
        }
      }
      
      return fav;
    });
  }, [resourceMap]);

  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      
      try {
        const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
        
        if (storedFavorites) {
          try {
            const parsedFavorites = JSON.parse(storedFavorites);
            
            if (!Array.isArray(parsedFavorites)) {
              console.error('Stored favorites is not an array:', parsedFavorites);
              setFavorites([]);
            } else {
              const validFavorites = parsedFavorites.filter((fav: any) => {
                return (
                  fav && 
                  typeof fav.title === 'string' &&
                  typeof fav.href === 'string' && 
                  typeof fav.description === 'string' &&
                  typeof fav.section === 'string'
                );
              });
              
              const favoritesWithIcons = restoreIcons(validFavorites);
              setFavorites(favoritesWithIcons);
            }
          } catch (parseError) {
            console.error('Failed to parse favorites:', parseError);
            setFavorites([]);
          }
        }
      } catch (storageError) {
        console.error('Error accessing localStorage:', storageError);
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
      const serializableFavorites = favorites.map(({ icon, ...rest }) => rest);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serializableFavorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites, isLoading]);

  const addFavorite = useCallback((resource: Resource) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.href === resource.href)) {
        return prev;
      }
      return [...prev, resource];
    });
  }, []);

  const removeFavorite = useCallback((href: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.href !== href));
  }, []);

  const isFavorite = useCallback((href: string) => {
    return favorites.some((fav) => fav.href === href);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      clearFavorites,
      isLoading,
    }),
    [favorites, addFavorite, removeFavorite, isFavorite, clearFavorites, isLoading]
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

// Export the Resource type for use in other components
export type { Resource };
