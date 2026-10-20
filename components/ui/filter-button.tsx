// The filter toggle beside the search box. It only opens and closes the
// panel; the one panel is rendered by VerticalNavigation, since this button
// appears in both the desktop header and the mobile bar.
'use client';

import { Filter, X } from 'lucide-react';
import { useSearch } from '@/contexts/search-context';
import { useIsMac } from '@/lib/hooks/use-is-mac';
import { cn } from '@/lib/utils';

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
    <div className="flex items-center gap-1">
      <button
        onClick={toggleFilterPanel}
        className={cn(
          'flex h-9 cursor-pointer items-center gap-2 px-2.5 text-sm md:border',
          isFilterPanelOpen
            ? 'text-accent md:border-accent'
            : 'text-muted-foreground hover:text-foreground md:border-border md:hover:border-foreground/40',
        )}
        aria-label={`Filter resources${
          hasFilters ? ` (${selectedTags.length} active)` : ''
        }`}
        aria-expanded={isFilterPanelOpen}
      >
        <Filter className="h-4 w-4" aria-hidden="true" />
        <span className="hidden md:inline">tags</span>
        {hasFilters && (
          <span className="bg-accent px-1.5 text-xs leading-5 text-accent-foreground">
            {selectedTags.length}
          </span>
        )}
        <kbd className="kbd hidden md:inline-flex">
          {isMac ? '⌘F' : 'Ctrl+F'}
        </kbd>
      </button>

      {hasFilters && !isFilterPanelOpen && (
        <button
          onClick={clearFilters}
          className="flex h-9 w-9 cursor-pointer items-center justify-center text-muted-foreground hover:text-destructive md:border md:border-border md:hover:border-destructive"
          aria-label="Clear all filters"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
