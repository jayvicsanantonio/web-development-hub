import { SECTIONS } from '@/constants/sections';

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
}

/**
 * The single rule for turning a section title into its DOM id. Every producer
 * of a `section-*` id must use this — previously four sites derived it
 * independently and one of them disagreed, leaving the Blogs entry unreachable.
 */
export function toSectionId(title: string): string {
  return `section-${title.toLowerCase().replace(/\s+/g, '-')}`;
}

export const NAV_ITEMS: NavigationItem[] = SECTIONS.map((section) => ({
  id: toSectionId(section.title),
  title: section.title,
  href: section.href,
}));

/**
 * Which sections currently have content, derived from the search results
 * rather than read back out of the rendered DOM.
 */
export function getNavItemsForSections(
  visibleSections: Set<string>
): NavigationItem[] {
  return NAV_ITEMS.filter((item) => visibleSections.has(item.title));
}

export function scrollToSection(id: string, onComplete?: () => void) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    onComplete?.();
  }
}
