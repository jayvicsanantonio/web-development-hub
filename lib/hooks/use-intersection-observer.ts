// Tracks which section is nearest the middle of the viewport, for the nav's
// active highlight.
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// A section counts as soon as any of it is inside the band this leaves, so the
// observer's threshold is 0. A ratio threshold is out of reach for a section
// taller than the band divided by it: 0.4 of a 60% band never counted a
// section taller than 1.5 viewports, so the highlight never reached it.
const ROOT_MARGIN = '-20% 0px -20% 0px';

/**
 * The observer watches the elements the ids name when it is built. The nav
 * using this stays mounted while pages render their sections afresh, so it is
 * rebuilt on every route change and whenever `sectionIds` is a new array:
 * callers memoise it, and pass a new one when they render a new list.
 */
export const useIntersectionObserver = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    if (sectionIds.length === 0) return;

    // Each callback names only the sections whose intersection just changed,
    // so a section already in view when its neighbour arrives is missing
    // from it. This remembers every section in view across callbacks.
    const intersecting = new Set<string>();

    // Chooses among the sections in view the one nearest the middle.
    const chooseActiveSection = () => {
      const visibleSections = [...intersecting].filter((id) =>
        id.startsWith('section-')
      );

      if (visibleSections.length > 0) {
        const viewportCenter = window.innerHeight / 2;
        let closestSection = visibleSections[0];
        let minDistance = Infinity;

        visibleSections.forEach((sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Zero for the section the middle runs through, however tall,
            // so a short neighbour's nearer centre cannot outrank it.
            const distance = Math.max(
              rect.top - viewportCenter,
              viewportCenter - rect.bottom,
              0
            );

            if (distance < minDistance) {
              minDistance = distance;
              closestSection = sectionId;
            }
          }
        });

        setActiveSection(closestSection);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });

        chooseActiveSection();
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Short sections can all sit inside the band at once, and a scroll that
    // moves the middle from one to the next then changes no intersection, so
    // the observer never calls back. Choosing again on scroll follows it.
    window.addEventListener('scroll', chooseActiveSection, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', chooseActiveSection);
    };
  }, [sectionIds, pathname]);

  return activeSection;
};
