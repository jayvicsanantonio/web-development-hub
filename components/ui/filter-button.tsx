// The filter toggle beside the search box. It only opens and closes the
// panel; the one panel is rendered by SiteNavigation, since this button
// appears in both the desktop header and the mobile bar.
'use client';

import { Filter, X } from 'lucide-react';
import { useSearch } from '@/contexts/search-context';
import { useIsMac } from '@/lib/hooks/use-is-mac';

export function FilterButton() {
  const {
    selectedTags,
    clearFilters,
    isFilterPanelOpen,
    toggleFilterPanel,
  } = useSearch();

  const isMac = useIsMac();

  const hasFilters = selectedTags.length > 0;

  return (
    <div className="relative flex items-center">
      <button
        onClick={toggleFilterPanel}
        className={`
          relative cursor-pointer h-9 px-2.5 rounded-sm
          flex items-center gap-2 md:border
          ${
            isFilterPanelOpen
              ? 'md:border-foreground md:bg-foreground md:text-background'
              : 'md:border-border md:hover:border-foreground'
          }
        `}
        aria-label={`Filter resources${
          hasFilters ? ` (${selectedTags.length} active)` : ''
        }`}
        aria-expanded={isFilterPanelOpen}
      >
        <Filter className="h-4 w-4" aria-hidden="true" />
        <kbd className="hidden md:flex h-5 items-center rounded-xs border border-current/25 px-1.5 font-mono text-[0.625rem] leading-none opacity-70">
          {isMac ? '⌘F' : 'Ctrl+F'}
        </kbd>

        {hasFilters && isFilterPanelOpen && (
          <div className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-0.5 bg-accent rounded-xs flex items-center justify-center animate-scale-in">
            <span className="font-mono text-[0.625rem] text-accent-foreground">
              {selectedTags.length}
            </span>
          </div>
        )}
      </button>

      {hasFilters && !isFilterPanelOpen && (
        <button
          onClick={clearFilters}
          className="
            absolute -top-1.5 -right-1.5 h-4 w-4 cursor-pointer
            bg-accent hover:bg-foreground
            rounded-xs flex items-center justify-center
            animate-scale-in
          "
          aria-label="Clear all filters"
        >
          <X className="h-3 w-3 text-accent-foreground" />
        </button>
      )}
    </div>
  );
}
