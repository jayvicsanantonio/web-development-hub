'use client';

import { SearchInput } from '@/components/ui/search-input';

export function DesktopSearch() {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:block">
      <SearchInput />
    </div>
  );
}
