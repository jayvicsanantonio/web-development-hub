'use client';

import { useState, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import { useSearch } from '@/contexts/search-context';
import { TagFilterPanel } from '@/components/ui/tag-filter-panel';

interface FilterButtonProps {
  className?: string;
}

export function FilterButton({ className = '' }: FilterButtonProps) {
  const {
    selectedTags,
    clearFilters,
    isFilterPanelOpen,
    setIsFilterPanelOpen,
  } = useSearch();

  // Detect platform for keyboard shortcut display
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(
      typeof navigator !== 'undefined' &&
        navigator.platform.includes('Mac')
    );
  }, []);

  const hasFilters = selectedTags.length > 0;

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          data-filter-button="true"
          className={`
            relative cursor-pointer h-10 px-3 rounded-full 
            backdrop-blur flex items-center gap-2
            md:border 
            md:shadow-md transition-all duration-300 
            transform-gpu animate-optimized
            ${
              isFilterPanelOpen
                ? 'border-accent-neon'
                : 'border-border/20'
            }
            ${className}
          `}
          aria-label={`Filter resources${
            hasFilters ? ` (${selectedTags.length} active)` : ''
          } (press ${isMac ? '⌘F' : 'Ctrl+F'})`}
          aria-expanded={isFilterPanelOpen}
        >
          <Filter className="h-4 w-4 text-foreground" />
          <div className="h-5 w-10 rounded-md bg-muted border border-border/50 flex items-center justify-center text-[10px] font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all px-1 tracking-tight leading-none">
            {isMac ? '⌘F' : 'Ctrl+F'}
          </div>

          {}
          {hasFilters && isFilterPanelOpen && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full flex items-center justify-center animate-scale-in">
              <span className="text-xs font-medium text-destructive-foreground">
                {selectedTags.length}
              </span>
            </div>
          )}
        </button>

        {}
        {hasFilters && !isFilterPanelOpen && (
          <button
            onClick={clearFilters}
            className="
              absolute -top-1 -right-1 h-4 w-4 cursor-pointer
              bg-destructive hover:bg-destructive/90
              rounded-full flex items-center justify-center
              transition-colors duration-200
              animate-scale-in
              transform-gpu
            "
            aria-label="Clear all filters"
          >
            <X className="h-4 w-4 md:h-3 md:w-3 text-destructive-foreground" />
          </button>
        )}
      </div>

      {}
      <TagFilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
      />
    </>
  );
}
