import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | null;
}

export const useIntersectionObserver = (
  sectionIds: string[],
  options: UseIntersectionObserverOptions = {}
) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // The effect observes a *set* of ids, so it should re-run when that set
  // changes — not whenever the caller happens to allocate a new array.
  const idsKey = sectionIds.join('|');
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  const {
    rootMargin = '-20% 0px -20% 0px',
    threshold = 0.4,
    root = null,
  } = options;

  useEffect(() => {
    const ids = idsRef.current;
    if (ids.length === 0) return;

    observerRef.current = new IntersectionObserver(
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

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on idsKey
    // (the set's value) with the array itself read through a ref.
  }, [idsKey, rootMargin, threshold, root]);

  return activeSection;
};
