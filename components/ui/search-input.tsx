'use client';

import { useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/contexts/search-context';
import { FilterButton } from './filter-button';
import { useIsMac } from '@/lib/hooks/use-is-mac';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const isMac = useIsMac();

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
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
            value={searchQuery}
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
                if (searchQuery) {
                  clearSearch();
                } else {
                  inputRef.current?.focus();
                }
              }}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                searchQuery ? 'h-5 w-8' : 'h-5 w-10'
              } rounded-md bg-muted border border-border/50 flex items-center justify-center text-[10px] font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer px-1 tracking-tight leading-none`}
              aria-label={
                searchQuery
                  ? 'Clear search (press ESC)'
                  : `Focus search (press ${isMac ? '⌘K' : 'Ctrl+K'})`
              }
              tabIndex={-1}
            >
              {searchQuery ? 'ESC' : isMac ? '⌘K' : 'Ctrl+K'}
            </button>
          )}
        </div>
        {!isMobile && <FilterButton />}
      </div>
    </form>
  );
}
