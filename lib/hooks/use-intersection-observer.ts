// Tracks which section is nearest the middle of the viewport, for the nav's
// active highlight.
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface UseIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | null;
}

/**
 * The observer watches the elements the ids name when it is built. The nav
 * using this stays mounted while pages render their sections afresh, so it is
 * rebuilt on every route change and whenever `sectionIds` is a new array:
 * callers memoise it, and pass a new one when they render a new list.
 */
export const useIntersectionObserver = (
  sectionIds: string[],
  options: UseIntersectionObserverOptions = {}
) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();

  const {
    rootMargin = '-20% 0px -20% 0px',
    threshold = 0.4,
    root = null,
  } = options;

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id)
          .filter((id) => id.startsWith('section-'));

        if (visibleSections.length > 0) {
          const viewportCenter = window.innerHeight / 2;
          let closestSection = visibleSections[0];
          let minDistance = Infinity;

          visibleSections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const sectionCenter = rect.top + rect.height / 2;
              const distance = Math.abs(
                sectionCenter - viewportCenter
              );

              if (distance < minDistance) {
                minDistance = distance;
                closestSection = sectionId;
              }
            }
          });

          setActiveSection(closestSection);
        }
      },
      {
        rootMargin,
        threshold,
        root,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, pathname, rootMargin, threshold, root]);

  return activeSection;
};
