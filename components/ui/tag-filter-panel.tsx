// The tag filter panel: every tag in the dataset as a toggle on SearchProvider's
// selection, with a featured few first. Escape or a click outside closes it.
'use client';

// The tags on offer come from the dataset, so a tag a resource gains is
// filterable at once. Only the featured few are chosen by hand.
import { useEffect, useRef } from 'react';
import { useSearch } from '@/contexts/search-context';
import { X, Star } from 'lucide-react';
import { Icon } from '@/lib/icons';
import { ALL_TAGS } from '@/constants/sections';
import { getTagIconName } from '@/lib/utils/tag-icons';

const PRIORITY_TAGS = [
  'ai',
  'interview-prep',
  'free',
  'beginner-friendly',
  'trending',
].filter((tag) => ALL_TAGS.includes(tag));

const tagLabel = (tag: string) => tag.replaceAll('-', ' ');

const getTagIcon = (tag: string) => {
  const iconName = getTagIconName(tag);
  return iconName ? (
    <Icon icon={iconName} className="h-3 w-3" />
  ) : null;
};

export function TagFilterPanel() {
  const {
    selectedTags,
    toggleTag,
    clearFilters,
    isFilterPanelOpen: isOpen,
    setIsFilterPanelOpen,
  } = useSearch();
  const isTagSelected = (tag: string) => selectedTags.includes(tag);
  const panelRef = useRef<HTMLDivElement>(null);

  const onClose = () => setIsFilterPanelOpen(false);

  // Depends only on the open state and the state setter, which never changes,
  // so the listeners are bound once per opening rather than on every render.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // The path as the click found it. By the time this runs, the click may
      // have removed its own target - Clear All removes the active filters it
      // sits in - so the target's current ancestors cannot say where it was.
      const path = event.composedPath();
      // Small delay to ensure button onClick handlers complete first
      setTimeout(() => {
        if (
          panelRef.current &&
          !path.includes(panelRef.current)
        ) {
          setIsFilterPanelOpen(false);
        }
      }, 0);
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFilterPanelOpen(false);
      }
    };

    if (isOpen) {
      // Use click instead of mousedown to avoid timing issues with button onClick
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, setIsFilterPanelOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center md:inset-auto md:top-[7.5rem] md:left-0 md:right-0">
      <div
        ref={panelRef}
        className="
          w-full h-dvh md:h-auto md:max-h-[70vh] overflow-y-auto
          md:w-[min(60rem,calc(100vw-4rem))]
          bg-popover text-popover-foreground
          md:border md:border-foreground md:rounded-sm
          md:shadow-[0_32px_64px_-32px_rgb(0_0_0/0.45)]
          p-5 md:p-8
          animate-scale-in
        "
      >
        <div className="flex items-start justify-between gap-4 border-b border-foreground pb-4 mb-6">
          <div>
            <p className="eyebrow text-accent">Refine the index</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl leading-none">
              Filter by Tags
            </h2>
          </div>
          <button
            onClick={onClose}
            className="
              flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center
              rounded-sm border border-border hover:border-foreground
            "
            aria-label="Close filter panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {selectedTags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="eyebrow text-muted-foreground">
                Active Filters ({selectedTags.length})
              </span>
              <button
                onClick={clearFilters}
                className="
                  font-mono text-xs uppercase tracking-wider
                  underline underline-offset-4 decoration-border
                  hover:decoration-foreground cursor-pointer
                "
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="
                    inline-flex items-center gap-1 h-7 pl-2.5 pr-1 rounded-xs
                    bg-foreground text-background
                    font-mono text-[0.6875rem] uppercase tracking-wider
                  "
                >
                  {getTagIcon(tag)}
                  {tagLabel(tag)}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="ml-1 rounded-xs p-1 hover:bg-background/20 cursor-pointer"
                    aria-label={`Remove ${tag} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="eyebrow text-muted-foreground">
                Featured Tags
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRIORITY_TAGS.map((tag) => {
                const isSelected = isTagSelected(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={isSelected}
                    className={`
                      inline-flex items-center gap-1.5 h-8 px-3 rounded-xs border cursor-pointer
                      font-mono text-[0.6875rem] uppercase tracking-wider
                      ${
                        isSelected
                          ? 'bg-foreground text-background border-foreground'
                          : 'border-foreground/60 hover:bg-muted'
                      }
                    `}
                  >
                    {getTagIcon(tag)}
                    <span>{tagLabel(tag)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="eyebrow text-muted-foreground mb-3 block">
              All Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.filter(
                (tag) => !PRIORITY_TAGS.includes(tag)
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={isTagSelected(tag)}
                  className={`
                    inline-flex items-center h-7 px-2.5 rounded-xs border cursor-pointer
                    font-mono text-[0.6875rem] uppercase tracking-wider
                    ${
                      isTagSelected(tag)
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                    }
                  `}
                >
                  {tagLabel(tag)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-3 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          <span>Click tags to add or remove filters</span>
          <span>
            {selectedTags.length} of {ALL_TAGS.length} tags selected
          </span>
        </div>
      </div>
    </div>
  );
}
