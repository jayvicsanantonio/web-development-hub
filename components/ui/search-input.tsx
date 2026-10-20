// The search box, in its header and mobile-sheet forms. The query lives in
// SearchProvider; this component only renders and edits it.
'use client';

import { useRef } from 'react';
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
    <form onSubmit={handleSearchSubmit} className="w-full max-w-xl">
      <div
        className={`${
          isMobile ? 'relative' : 'flex items-center gap-2'
        }`}
      >
        <div className="relative flex-1">
          {/* A shell prompt in place of a magnifier. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm font-bold text-prompt"
          >
            $
          </span>
          <Input
            ref={inputRef}
            type="search"
            placeholder="search resources…"
            value={searchQuery}
            onChange={handleSearchChange}
            className={`${
              isMobile ? 'h-10 w-full pl-7 pr-3' : 'h-9 w-full pl-7 pr-16'
            } rounded-none border-border bg-muted/50 shadow-none placeholder:text-muted-foreground/70 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none`}
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
              className="kbd absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:border-accent hover:text-accent"
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
