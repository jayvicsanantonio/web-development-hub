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

  // A section counts as soon as any of it is inside the band rootMargin
  // leaves. A ratio threshold is out of reach for a section taller than the
  // band divided by it: 0.4 of a 60% band never counted a section taller
  // than 1.5 viewports, so the highlight never reached it.
  const {
    rootMargin = '-20% 0px -20% 0px',
    threshold = 0,
    root = null,
  } = options;

  useEffect(() => {
    if (sectionIds.length === 0) return;

    // Each callback names only the sections whose intersection just changed,
    // so a section already in view when its neighbour arrives is missing
    // from it. This remembers every section in view across callbacks.
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });

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
