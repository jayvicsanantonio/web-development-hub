'use client';

import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useSearch } from '@/contexts/search-context';
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer';
import { useSearchNavItems } from '@/lib/hooks/use-search-nav-items';
import { scrollToSection } from '@/lib/utils/navigation';
import { MobileNavigation } from '@/components/ui/navigation/mobile-navigation';
import { DesktopNavigation } from '@/components/ui/navigation/desktop-navigation';
import { DesktopSearch } from '@/components/ui/navigation/desktop-search';

export default function VerticalNavigation() {
  const pathname = usePathname();
  const { searchResults } = useSearch();

  const isHomeActive = pathname === '/';
  const isBookmarksActive = pathname === '/bookmarks';


  const excludedRoutes = ['/privacy-policy', '/terms-of-service'];
  const shouldHideSearch = excludedRoutes.includes(pathname);

  const navItems = useSearchNavItems(searchResults);

  const sectionIds = useMemo(
    () => navItems.map((item) => item.id),
    [navItems]
  );
  const activeSection = useIntersectionObserver(sectionIds);

  const handleScrollToSection = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <>
      <MobileNavigation
        navItems={navItems}
        hideSearch={shouldHideSearch}
      />
      <DesktopNavigation
        navItems={navItems}
        activeSection={activeSection}
        isHomeActive={isHomeActive}
        isBookmarksActive={isBookmarksActive}
        onScrollToSection={handleScrollToSection}
      />
      {!shouldHideSearch && <DesktopSearch />}
    </>
  );
}
