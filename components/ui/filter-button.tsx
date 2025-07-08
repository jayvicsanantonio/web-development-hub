'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useSearch } from '@/contexts/search-context';
import { TagFilterPanel } from '@/components/ui/tag-filter-panel';

interface FilterButtonProps {
  className?: string;
}

export function FilterButton({ className = '' }: FilterButtonProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { selectedTags, clearFilters } = useSearch();

  const hasFilters = selectedTags.length > 0;

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`
            relative cursor-pointer h-10 w-10 rounded-full 
            bg-background-secondary/80 backdrop-blur-md 
            border border-white/20 
            shadow-md transition-all duration-300 
            hover:bg-background-secondary/90 hover:border-white/30
            focus:outline-none focus:ring-2 focus:ring-accent-neon/50
            ${hasFilters ? 'ring-2 ring-accent-neon/40' : ''}
            ${className}
          `}
          aria-label={`Filter resources${
            hasFilters ? ` (${selectedTags.length} active)` : ''
          }`}
          aria-expanded={isFilterOpen}
        >
          <Filter className="h-4 w-4 text-foreground opacity-70 mx-auto" />

          {/* Active filter indicator */}
          {hasFilters && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-accent-neon rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-background">
                {selectedTags.length}
              </span>
            </div>
          )}
        </button>

        {/* Clear filters button when filters are active */}
        {hasFilters && !isFilterOpen && (
          <button
            onClick={clearFilters}
            className="
              absolute -top-2 -right-2 h-5 w-5 cursor-pointer
              bg-red-500 hover:bg-red-600 
              rounded-full flex items-center justify-center
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-red-500/50
            "
            aria-label="Clear all filters"
          >
            <X className="h-3 w-3 text-white" />
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <TagFilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
}
