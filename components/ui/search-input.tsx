'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/contexts/search-context';
import { FilterButton } from './filter-button';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Detect platform for keyboard shortcut display
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(
      typeof navigator !== 'undefined' &&
        navigator.platform.includes('Mac')
    );
  }, []);

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Escape') {
      clearSearch();
      inputRef.current?.blur();
    }
    onKeyDown?.(e);
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
            ref={inputRef}
            type="search"
            placeholder="Find resources..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className={`${
              isMobile
                ? 'w-full pr-10'
                : 'w-64 h-10 pl-9 pr-16 backdrop-blur-md rounded-full shadow-md border-border/20 transition-all duration-300 dark:hover:bg-background-primary/90'
            } ${className} [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none`}
            aria-label="Search resources"
            autoComplete="off"
            onKeyDown={handleKeyDown}
          />
          {!isMobile && (
            <button
              type="button"
              onClick={() => {
                if (localSearchQuery) {
                  clearSearch();
                } else {
                  inputRef.current?.focus();
                }
              }}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                localSearchQuery ? 'h-5 w-8' : 'h-5 w-10'
              } rounded-md bg-muted border border-border/50 flex items-center justify-center text-[10px] font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer px-1 tracking-tight leading-none`}
              aria-label={
                localSearchQuery
                  ? 'Clear search (press ESC)'
                  : `Focus search (press ${isMac ? '⌘K' : 'Ctrl+K'})`
              }
              tabIndex={-1}
            >
              {localSearchQuery ? 'ESC' : isMac ? '⌘K' : 'Ctrl+K'}
            </button>
          )}
        </div>
        {!isMobile && <FilterButton />}
      </div>
    </form>
  );
}
