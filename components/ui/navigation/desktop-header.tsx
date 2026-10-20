// The desktop header, fixed across the top of every page: the way home, the
// search box and tag filter, the bookmarks link and the theme switch.
'use client';

import Link from 'next/link';
import { BookmarkIcon, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toggleTheme } from '@/lib/theme';
import { useBookmarks } from '@/contexts/bookmarks-context';
import { useIsMac } from '@/lib/hooks/use-is-mac';
import { SearchInput } from '@/components/ui/search-input';

interface DesktopHeaderProps {
  isHomeActive: boolean;
  isBookmarksActive: boolean;
  /** Leaves out the search box and the filter, as the legal pages do. */
  hideSearch: boolean;
}

/** Hidden below md, where the mobile bar takes its place. */
export function DesktopHeader({
  isHomeActive,
  isBookmarksActive,
  hideSearch,
}: DesktopHeaderProps) {
  const isMac = useIsMac();
  const { bookmarks } = useBookmarks();
  const savedCount = bookmarks.length;

  return (
    <header className="fixed inset-x-0 top-0 z-40 hidden h-14 border-b border-border bg-background md:flex">
      {/* As wide as the section index from lg, so its edge continues the
          index's border up through the header. */}
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2.5 px-4 text-sm font-bold tracking-tight hover:text-accent lg:w-72 lg:border-r lg:border-border lg:px-5"
        aria-label={`Return to home page (${isMac ? '⌘H' : 'Ctrl+H'})`}
        aria-current={isHomeActive ? 'page' : undefined}
      >
        <span
          aria-hidden="true"
          className="bg-accent px-1 text-accent-foreground"
        >
          &gt;_
        </span>
        webdevhub
      </Link>

      <div className="flex min-w-0 flex-1 items-center px-4 lg:px-8">
        {!hideSearch && <SearchInput />}
      </div>

      <div className="flex items-center gap-1 pr-3">
        <Link
          href="/bookmarks"
          className={cn(
            'flex h-9 items-center gap-2 px-3 text-sm hover:bg-muted',
            isBookmarksActive
              ? 'text-accent'
              : 'text-muted-foreground hover:text-foreground',
          )}
          aria-label={`Navigate to bookmarks, ${savedCount} saved (${
            isMac ? '⌘B' : 'Ctrl+B'
          })`}
          aria-current={isBookmarksActive ? 'page' : undefined}
        >
          <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
          bookmarks
          {savedCount > 0 && (
            <span className="bg-accent px-1.5 text-xs leading-5 text-accent-foreground">
              {savedCount}
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 cursor-pointer items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={`Switch between light and dark mode (${
            isMac ? '⌘⇧L' : 'Ctrl+Shift+L'
          })`}
        >
          <Sun
            className="hidden h-4 w-4 dark:block"
            aria-hidden="true"
          />
          <Moon
            className="block h-4 w-4 dark:hidden"
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
