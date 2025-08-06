import { SECTIONS } from '@/constants/sections';
import { getResourceIcon } from '@/lib/data/resource-mappings';

export interface NavigationItem {
  id: string;
  title: string;
  iconName: string;
}

export const DEFAULT_NAV_ITEMS: NavigationItem[] = [
  {
    id: 'section-learning-resources',
    title: 'Learning Resources',
    iconName: getResourceIcon('Learning Resources'),
  },
  {
    id: 'section-developer-tools',
    title: 'Developer Tools',
    iconName: getResourceIcon('Developer Tools'),
  },
  {
    id: 'section-frameworks-and-libraries',
    title: 'Frameworks and Libraries',
    iconName: getResourceIcon('Frameworks and Libraries'),
  },
  {
    id: 'section-communities',
    title: 'Communities',
    iconName: getResourceIcon('Communities'),
  },
  {
    id: 'section-blogs',
    title: 'Blogs and Newsletters',
    iconName: getResourceIcon('Blogs and Newsletters'),
  },
];

export function createSearchNavItems(
  searchQuery: string
): NavigationItem[] {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return DEFAULT_NAV_ITEMS;
  }

  if (typeof document === 'undefined') {
    return DEFAULT_NAV_ITEMS;
  }

  const sections = document.querySelectorAll('section[id]');
  const sectionsWithContent = Array.from(sections).filter(
    (section) => {
      const gridContainer = section.querySelector('.grid');
      return gridContainer && gridContainer.children.length > 0;
    }
  );

  const sectionIdsWithContent = sectionsWithContent.map(
    (section) => section.id
  );

  const searchNavItems = sectionIdsWithContent
    .filter((id) => id.startsWith('section-'))
    .map((id) => {
      let displayName = id
        .replace('section-', '')
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      if (displayName === 'Frameworks And Libraries') {
        displayName = 'Frameworks and Libraries';
      } else {
        displayName = displayName.replace(/\b[aA][nN][dD]\b/g, '&');
      }

      const matchingSection = SECTIONS.find(
        (section) =>
          section.title.toLowerCase() === displayName.toLowerCase() ||
          section.title.toLowerCase().replace(' & ', ' and ') ===
            displayName.toLowerCase()
      );

      return {
        id,
        title: displayName,
        iconName: getResourceIcon(displayName),
      };
    });

  return searchNavItems;
}

export function scrollToSection(id: string, onComplete?: () => void) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    onComplete?.();
  }
}
