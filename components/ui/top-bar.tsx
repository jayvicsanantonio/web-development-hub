// The desktop top bar: the search box and the filter toggle, pinned to the top
// of the main panel. The pages that list no resources get none.
'use client';

import { usePathname } from 'next/navigation';
import { SearchInput } from '@/components/ui/search-input';
import { SEARCHLESS_ROUTES } from '@/lib/utils/navigation';

export function TopBar() {
  const pathname = usePathname();

  if (SEARCHLESS_ROUTES.includes(pathname)) return null;

  // Hidden below md, where the mobile bar opens its own search.
  return (
    <div className="sticky top-0 z-20 hidden h-14 shrink-0 items-center border-b border-border bg-background/85 px-6 backdrop-blur md:flex">
      <SearchInput />
    </div>
  );
}
