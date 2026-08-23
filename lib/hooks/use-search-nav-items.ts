import { useMemo } from 'react';
import {
  NAV_ITEMS,
  getNavItemsForSections,
  type NavigationItem,
} from '@/lib/utils/navigation';

/**
 * Nav items for the current search state.
 *
 * This used to read the rendered DOM and reconstruct titles from element ids,
 * which needed an `isClient` flag and a `setTimeout(…, 0)` to outrun the render
 * that produced the markup it was reading. Deriving from the same data the page
 * renders makes it a pure function: no state, no effects, no race.
 */
export function useSearchNavItems(
  searchResults: { section: string }[] | null
): NavigationItem[] {
  return useMemo(() => {
    if (!searchResults) {
      return NAV_ITEMS;
    }

    const visible = new Set(
      searchResults.map((resource) => resource.section)
    );

    return getNavItemsForSections(visible);
  }, [searchResults]);
}
