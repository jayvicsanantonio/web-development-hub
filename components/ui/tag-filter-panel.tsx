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

/**
 * One tag as a checklist entry. The checkbox is drawn in text and hidden from
 * assistive technology, which reads aria-pressed instead, so the button is
 * named by its tag alone.
 */
function TagToggle({
  tag,
  isSelected,
  onToggle,
  withIcon = false,
}: {
  tag: string;
  isSelected: boolean;
  onToggle: (tag: string) => void;
  withIcon?: boolean;
}) {
  return (
    <button
      onClick={() => onToggle(tag)}
      aria-pressed={isSelected}
      className={`
        inline-flex items-center gap-1.5 px-2 py-1 text-xs cursor-pointer
        ${
          isSelected
            ? 'bg-accent/10 text-accent'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }
      `}
    >
      <span aria-hidden="true">{isSelected ? '[x]' : '[ ]'}</span>
      {withIcon && getTagIcon(tag)}
      <span>{tagLabel(tag)}</span>
    </button>
  );
}

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
    <div className="fixed inset-0 z-50 flex items-start justify-center md:inset-auto md:left-1/2 md:top-16 md:-translate-x-1/2">
      <div
        ref={panelRef}
        className="
          w-full max-h-[100dvh] overflow-y-auto
          md:w-[min(48rem,calc(100vw-2rem))] md:max-h-[75vh]
          bg-popover text-popover-foreground
          border border-border shadow-2xl shadow-black/40
        "
      >
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-border bg-popover px-4 py-3 md:px-6">
          <div className="flex items-baseline gap-2">
            <span aria-hidden="true" className="text-sm text-prompt">
              $
            </span>
            <h2 className="text-sm font-semibold text-foreground">
              Filter by Tags
            </h2>
          </div>
          <button
            onClick={onClose}
            className="
              p-1.5 cursor-pointer
              text-muted-foreground hover:text-foreground hover:bg-muted
            "
            aria-label="Close filter panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-4 py-5 md:px-6">
          {selectedTags.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {'// active'} ({selectedTags.length})
                </span>
                <button
                  onClick={clearFilters}
                  className="
                    px-2 py-0.5 text-xs cursor-pointer
                    text-muted-foreground hover:text-destructive
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
                      inline-flex items-center gap-1 pl-2 pr-1 py-0.5
                      bg-accent text-accent-foreground text-xs
                    "
                  >
                    {getTagIcon(tag)}
                    {tagLabel(tag)}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="
                        ml-0.5 p-0.5 cursor-pointer
                        hover:bg-accent-foreground/20
                      "
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
            <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="h-3 w-3 text-accent" />
              <span>{'// featured'}</span>
            </div>
            <div className="flex flex-wrap gap-x-1 gap-y-1">
              {PRIORITY_TAGS.map((tag) => (
                <TagToggle
                  key={tag}
                  tag={tag}
                  isSelected={isTagSelected(tag)}
                  onToggle={toggleTag}
                  withIcon
                />
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-xs text-muted-foreground">
              {'// all tags'}
            </span>
            <div className="flex flex-wrap gap-x-1 gap-y-1">
              {ALL_TAGS.filter(
                (tag) => !PRIORITY_TAGS.includes(tag)
              ).map((tag) => (
                <TagToggle
                  key={tag}
                  tag={tag}
                  isSelected={isTagSelected(tag)}
                  onToggle={toggleTag}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2.5 text-xs text-muted-foreground md:px-6">
          <span>Click tags to add or remove filters</span>
          <span>
            {selectedTags.length} of {ALL_TAGS.length} tags selected
          </span>
        </div>
      </div>
    </div>
  );
}
