'use client';

import { SearchInput } from '@/components/ui/search-input';

interface DesktopSearchProps {
  onSearchComplete: () => void;
}

export function DesktopSearch({
  onSearchComplete,
}: DesktopSearchProps) {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:block">
      <SearchInput onSubmit={onSearchComplete} />
    </div>
  );
}
