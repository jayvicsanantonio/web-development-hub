import { SECTIONS } from '@/constants/sections';

export interface NavigationItem {
  id: string;
  title: string;
  icon: React.FC<{ className?: string }>;
}

export const DEFAULT_NAV_ITEMS: NavigationItem[] = [
  {
    id: 'section-learning-resources',
    title: 'Learning Resources',
    icon: SECTIONS[0].icon,
  },
  {
    id: 'section-developer-tools',
    title: 'Developer Tools',
    icon: SECTIONS[1].icon,
  },
  {
    id: 'section-frameworks-and-libraries',
    title: 'Frameworks and Libraries',
    icon: SECTIONS[2].icon,
  },
  {
    id: 'section-communities',
    title: 'Communities',
    icon: SECTIONS[3].icon,
  },
  { id: 'section-blogs', title: 'Blogs', icon: SECTIONS[4].icon },
];

export function createSearchNavItems(
  searchQuery: string
): NavigationItem[] {
  if (!searchQuery || searchQuery.trim().length === 0) {
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

      // Handle special case for "Frameworks and Libraries"
      if (displayName === 'Frameworks And Libraries') {
        displayName = 'Frameworks and Libraries';
      } else {
        // Convert other "and" instances to "&"
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
        icon: matchingSection?.icon || SECTIONS[0].icon,
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
