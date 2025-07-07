'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useSearch } from '@/contexts/search-context';
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer';
import { useSearchNavItems } from '@/lib/hooks/use-search-nav-items';
import {
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

  // Hide search functionality for privacy policy and terms of service pages
  const excludedRoutes = ['/privacy-policy', '/terms-of-service'];
  const shouldHideSearch = excludedRoutes.includes(pathname);

  const navItems = useSearchNavItems(searchQuery || '');

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
        onScrollToSection={handleScrollToSection}
        hideSearch={shouldHideSearch}
      />
      <DesktopNavigation
        navItems={navItems}
        activeSection={activeSection}
        isHomeActive={isHomeActive}
        isFavoritesActive={isFavoritesActive}
        onScrollToSection={handleScrollToSection}
      />
      {!shouldHideSearch && <DesktopSearch />}
    </>
  );
}
