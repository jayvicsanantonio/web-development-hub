// Chooses what the side nav lists for the current page and search state, and
// renders the desktop rail, the mobile bar, the desktop search and the one
// filter panel both layouts open.
'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useSearch } from '@/contexts/search-context';
import { useBookmarks } from '@/contexts/bookmarks-context';
import { useIntersectionObserver } from '@/lib/hooks/use-intersection-observer';
import { ALL_RESOURCES } from '@/constants/sections';
import {
  DEFAULT_NAV_ITEMS,
  sectionNavItems,
} from '@/lib/utils/navigation';
import { filterResources, isFiltering } from '@/lib/utils/search';
import { MobileNavigation } from '@/components/ui/navigation/mobile-navigation';
import { DesktopNavigation } from '@/components/ui/navigation/desktop-navigation';
import { SearchInput } from '@/components/ui/search-input';
import { TagFilterPanel } from '@/components/ui/tag-filter-panel';

const EXCLUDED_SEARCH_ROUTES = ['/privacy-policy', '/terms-of-service'];

export default function VerticalNavigation() {
  const pathname = usePathname();
  const { deferredQuery, selectedTags } = useSearch();
  const { bookmarks } = useBookmarks();

  const isHomeActive = pathname === '/';
  const isBookmarksActive = pathname === '/bookmarks';

  const shouldHideSearch = EXCLUDED_SEARCH_ROUTES.includes(pathname);

  // The rail lists the sections the page renders. The bookmarks page groups the
  // saved resources the filter leaves; the home page groups the catalogue's
  // results while filtering, and otherwise shows every section.
  const filtering = isFiltering(deferredQuery, selectedTags);

  const navItems = useMemo(() => {
    if (isBookmarksActive) {
      return sectionNavItems(
        filterResources(bookmarks, deferredQuery, selectedTags)
      );
    }
    return filtering
      ? sectionNavItems(
          filterResources(ALL_RESOURCES, deferredQuery, selectedTags)
        )
      : DEFAULT_NAV_ITEMS;
  }, [
    isBookmarksActive,
    bookmarks,
    filtering,
    deferredQuery,
    selectedTags,
  ]);

  // Memoised because it is the observer's dependency: a fresh array each render
  // tore the IntersectionObserver down and rebuilt it on every keystroke.
  const sectionIds = useMemo(
    () => navItems.map((item) => item.id),
    [navItems]
  );
  const activeSection = useIntersectionObserver(sectionIds);

  return (
    <>
      <MobileNavigation hideSearch={shouldHideSearch} />
      <DesktopNavigation
        navItems={navItems}
        activeSection={activeSection}
        isHomeActive={isHomeActive}
        isBookmarksActive={isBookmarksActive}
      />
      {!shouldHideSearch && (
        <>
          {/* Hidden below md, where the mobile bar opens its own. */}
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:block">
            <SearchInput />
          </div>
          {/* One panel for both layouts: the desktop header and the mobile bar
              each have a filter button, and both open this. */}
          <TagFilterPanel />
        </>
      )}
    </>
  );
}
