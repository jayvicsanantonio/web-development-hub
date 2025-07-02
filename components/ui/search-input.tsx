'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/contexts/search-context';

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
  onKeyDown
}: SearchInputProps) {
  const {
    searchQuery,
    setSearchQuery,
    clearSearch,
  } = useSearch();
  
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
      <div className="relative">
        {!isMobile && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground opacity-70" />
        )}
        <Input
          id={isMobile ? "mobile-search-input" : "desktop-search-input"}
          type="search"
          placeholder="Search resources..."
          value={localSearchQuery}
          onChange={handleSearchChange}
          className={`${isMobile ? 'w-full pr-10 bg-background-secondary' : 'w-64 pl-9 pr-10 py-2 bg-background-secondary/80 backdrop-blur-md rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-background-secondary/90'} ${className}`}
          aria-label="Search resources"
          autoComplete="off"
          onKeyDown={onKeyDown}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-accent-neon text-background"
          aria-label="Submit search"
        >
          <Search className={isMobile ? "h-4 w-4" : "h-3 w-3"} />
        </button>
      </div>
    </form>
  );
}
