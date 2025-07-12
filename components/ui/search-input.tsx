'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/contexts/search-context';
import { FilterButton } from './filter-button';

interface SearchInputProps {
  isMobile?: boolean;
  onSubmit?: () => void;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchInput({
  isMobile = false,
  onSubmit,
  className = '',
  onKeyDown,
}: SearchInputProps) {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();

  const [localSearchQuery, setLocalSearchQuery] = useState('');

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    setSearchQuery(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      onSubmit?.();
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div
        className={`${
          isMobile ? 'relative' : 'flex items-center gap-3'
        }`}
      >
        <div className="relative flex-1">
          {!isMobile && (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground opacity-70 z-10 pointer-events-none" />
          )}
          <Input
            id={
              isMobile
                ? 'mobile-search-input'
                : 'desktop-search-input'
            }
            type="search"
            placeholder="Search resources..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className={`${
              isMobile
                ? 'w-full pr-10 bg-background-primary'
                : 'w-64 h-10 pl-9 pr-10 dark:bg-background-primary/80 backdrop-blur-md rounded-full shadow-md border border-white/20 transition-all duration-300 dark:hover:bg-background-primary/90'
            } ${className}`}
            aria-label="Search resources"
            autoComplete="off"
            onKeyDown={onKeyDown}
          />
          {isMobile && (
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background-primary text-background"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
        </div>

        {}
        {!isMobile && <FilterButton />}
      </div>
    </form>
  );
}
