// The search box, in its header and mobile-sheet forms. The query lives in
// SearchProvider; this component only renders and edits it.
'use client';

import { useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/contexts/search-context';
import { useIsMac } from '@/lib/hooks/use-is-mac';
import { FilterButton } from './filter-button';

interface SearchInputProps {
  isMobile?: boolean;
  onSubmit?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchInput({
  isMobile = false,
  onSubmit,
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
          isMobile ? 'relative' : 'flex items-center gap-2'
        }`}
      >
        <div className="relative flex-1">
          {!isMobile && (
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none"
              aria-hidden="true"
            />
          )}
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search the index"
            value={searchQuery}
            onChange={handleSearchChange}
            className={`${
              isMobile
                ? 'w-full h-11 pr-10 border-foreground'
                : 'w-64 lg:w-72 h-9 pl-9 pr-16 border-border hover:border-foreground'
            } rounded-sm bg-card shadow-none font-mono text-[0.8125rem] md:text-[0.8125rem] placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none`}
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
              className="absolute right-2 top-1/2 -translate-y-1/2 h-5 rounded-xs border border-border bg-background flex items-center justify-center font-mono text-[0.625rem] text-muted-foreground hover:border-foreground hover:text-foreground cursor-pointer px-1.5 leading-none"
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
