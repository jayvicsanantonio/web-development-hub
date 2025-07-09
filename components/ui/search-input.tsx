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
    
    // Sanitize input to prevent XSS attacks
    const sanitizedValue = value
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/['"]/g, '') // Remove quotes
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .substring(0, 100); // Limit length
    
    setLocalSearchQuery(sanitizedValue);
    setSearchQuery(sanitizedValue);
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
                ? 'w-full pr-10 bg-background-secondary'
                : 'w-64 h-10 pl-9 pr-10 bg-background-secondary/80 backdrop-blur-md rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-background-secondary/90'
            } ${className}`}
            aria-label="Search resources"
            autoComplete="off"
            onKeyDown={onKeyDown}
          />
          {isMobile && (
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-accent-neon text-background"
              aria-label="Submit search"
            >
              <Search className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Button - only show on desktop */}
        {!isMobile && <FilterButton />}
      </div>
    </form>
  );
}
