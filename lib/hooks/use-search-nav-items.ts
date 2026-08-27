import { useState, useEffect } from 'react';
import {
  createSearchNavItems,
  DEFAULT_NAV_ITEMS,
  type NavigationItem,
} from '@/lib/utils/navigation';

export function useSearchNavItems(
  searchQuery: string
): NavigationItem[] {
  const [navItems, setNavItems] =
    useState<NavigationItem[]>(DEFAULT_NAV_ITEMS);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    }


    const timer = setTimeout(() => {
      const items = createSearchNavItems(searchQuery);
      setNavItems(items);
    }, 0);

    return () => clearTimeout(timer);
  }, [searchQuery, isClient]);

  return navItems;
}
