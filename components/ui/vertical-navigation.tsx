'use client';

import { useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useSearch } from '@/contexts/search-context';
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer';
import {
  createSearchNavItems,
  scrollToSection,
  type NavigationItem as NavigationItemType,
} from '@/lib/utils/navigation';
import { MobileNavigation } from '@/components/ui/navigation/mobile-navigation';
import { DesktopNavigation } from '@/components/ui/navigation/desktop-navigation';
import { DesktopSearch } from '@/components/ui/navigation/desktop-search';

export default function VerticalNavigation() {
  const pathname = usePathname();
  const { searchQuery } = useSearch();

  const isHomeActive = pathname === '/';
  const isFavoritesActive = pathname === '/favorites';

  const navItems = useMemo(() => {
    return createSearchNavItems(searchQuery || '');
  }, [searchQuery]);

  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useIntersectionObserver(sectionIds);

  const handleScrollToSection = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <>
      <MobileNavigation
        navItems={navItems}
        activeSection={activeSection}
        isHomeActive={isHomeActive}
        isFavoritesActive={isFavoritesActive}
        onScrollToSection={handleScrollToSection}
      />
      <DesktopNavigation
        navItems={navItems}
        activeSection={activeSection}
        isHomeActive={isHomeActive}
        isFavoritesActive={isFavoritesActive}
        onScrollToSection={handleScrollToSection}
      />
      <DesktopSearch />
    </>
  );
}
