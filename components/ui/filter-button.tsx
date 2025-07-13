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
             backdrop-blur
            md:border 
            md:shadow-md transition-all duration-300 
            transform-gpu animate-optimized
            ${
              isFilterOpen ? 'border-accent-neon' : 'border-border/20'
            }
            ${className}
          `}
          aria-label={`Filter resources${
            hasFilters ? ` (${selectedTags.length} active)` : ''
          }`}
          aria-expanded={isFilterOpen}
        >
          <Filter className="h-5 w-5 md:h-4 md:w-4 text-foreground mx-auto" />

          {}
          {hasFilters && isFilterOpen && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full flex items-center justify-center animate-scale-in">
              <span className="text-xs font-medium text-destructive-foreground">
                {selectedTags.length}
              </span>
            </div>
          )}
        </button>

        {}
        {hasFilters && !isFilterOpen && (
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
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
}
