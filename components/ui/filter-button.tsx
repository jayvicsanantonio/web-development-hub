// The filter toggle beside the search box. It only opens and closes the
// panel; the one panel is rendered by VerticalNavigation, since this button
// appears in both the desktop top bar and the mobile bar.
'use client';

import { ListFilter, X } from 'lucide-react';
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
    <div className="relative flex items-center">
      <button
        onClick={toggleFilterPanel}
        className={cn(
          'cursor-pointer inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md px-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground',
          'md:rounded-lg md:border md:bg-background md:px-3',
          isFilterPanelOpen
            ? 'text-foreground md:border-ring'
            : 'md:border-border',
        )}
        aria-label={`Filter resources${
          hasFilters ? ` (${selectedTags.length} active)` : ''
        }`}
        aria-expanded={isFilterPanelOpen}
      >
        <ListFilter className="h-4 w-4" aria-hidden="true" />
        <span className="hidden md:inline">Filter</span>
        {hasFilters && (
          <span className="rounded bg-primary px-1.5 text-[11px] font-semibold leading-4 tabular-nums text-primary-foreground animate-scale-in">
            {selectedTags.length}
          </span>
        )}
        <kbd className="hidden md:inline rounded border border-border px-1 font-sans text-[10px] leading-4 text-muted-foreground">
          {isMac ? '⌘F' : 'Ctrl+F'}
        </kbd>
      </button>

      {hasFilters && !isFilterPanelOpen && (
        <button
          onClick={clearFilters}
          className="
            absolute -top-1.5 -right-1.5 h-4 w-4 cursor-pointer
            bg-foreground text-background hover:bg-foreground/80
            rounded-full flex items-center justify-center
            animate-scale-in
          "
          aria-label="Clear all filters"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
