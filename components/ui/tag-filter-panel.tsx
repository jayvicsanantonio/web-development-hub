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
import { cn } from '@/lib/utils';

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

  const chipClassName = (isSelected: boolean) =>
    cn(
      'inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium',
      isSelected
        ? 'border-primary/40 bg-primary/10 text-primary'
        : 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground',
    );

  // Centred over the main panel on desktop, whose centre sits half the
  // sidebar's width right of the window's.
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[rgb(0_0_0/0.4)] p-3 md:inset-auto md:top-[4.5rem] md:left-[calc(50%+8rem)] md:w-[min(44rem,calc(100vw-19rem))] md:-translate-x-1/2 md:bg-transparent md:p-0">
      <div
        ref={panelRef}
        className="
          flex w-full max-h-[85vh] md:max-h-[75vh] flex-col overflow-hidden
          bg-popover text-popover-foreground
          border border-border rounded-xl
          shadow-2xl
          animate-scale-in
        "
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">
            Filter by Tags
          </h2>
          <button
            onClick={onClose}
            className="
              cursor-pointer rounded-md p-1.5 text-muted-foreground
              hover:bg-accent hover:text-foreground
            "
            aria-label="Close filter panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-4">
          {selectedTags.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Active Filters ({selectedTags.length})
                </span>
                <button
                  onClick={clearFilters}
                  className="
                    cursor-pointer rounded-md px-2 py-1 text-xs font-medium
                    text-muted-foreground hover:bg-accent hover:text-foreground
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
                      inline-flex items-center gap-1 rounded-md border border-primary/40
                      bg-primary/10 py-0.5 pl-2 pr-1 text-xs font-medium text-primary
                    "
                  >
                    {getTagIcon(tag)}
                    {tagLabel(tag)}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="cursor-pointer rounded p-0.5 hover:bg-primary/20"
                      aria-label={`Remove ${tag} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="mb-2 flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Featured Tags
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRIORITY_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={chipClassName(isTagSelected(tag))}
                >
                  {getTagIcon(tag)}
                  <span>{tagLabel(tag)}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-xs font-medium text-muted-foreground">
              All Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.filter(
                (tag) => !PRIORITY_TAGS.includes(tag)
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={chipClassName(isTagSelected(tag))}
                >
                  {tagLabel(tag)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">
          <span>Click tags to add or remove filters</span>
          <span>
            {selectedTags.length} of {ALL_TAGS.length} tags selected
          </span>
        </div>
      </div>
    </div>
  );
}
