// The desktop header: the wordmark, search, bookmarks and theme toggle, over a
// strip of the index's sections. Arrow keys rove focus through the strip.
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookmarkIcon, Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@/lib/theme';
import { SECTIONS } from '@/constants/sections';
import {
  scrollToSection,
  sectionNumber,
  type NavigationItem as NavigationItemType,
} from '@/lib/utils/navigation';
import { useRef } from 'react';
import { useIsMac } from '@/lib/hooks/use-is-mac';

/**
 * The label under a header control, shown on hover or keyboard focus. It keys
 * on :focus-visible rather than any focus, so a mouse click, which leaves focus
 * on the control, does not keep the label up after the pointer moves away.
 */
function NavTooltip({
  label,
  shortcut,
  alignClassName = 'right-0',
}: {
  label: string;
  shortcut?: string;
  alignClassName?: string;
}) {
  return (
    <div
      className={cn(
        'absolute top-full mt-2 z-10 transition-opacity duration-150 whitespace-nowrap pointer-events-none',
        alignClassName,
        'opacity-0 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100',
      )}
      role="tooltip"
    >
      <div className="flex items-center gap-2 border border-foreground bg-popover px-2.5 py-1.5 text-xs text-popover-foreground">
        {label}
        {shortcut && (
          <kbd className="font-mono text-[0.625rem] text-muted-foreground">
            {shortcut}
          </kbd>
        )}
      </div>
    </div>
  );
}

/** How a strip entry reads: its number in the index, then its title. */
function StripLabel({
  title,
  isCurrent,
}: {
  title: string;
  isCurrent: boolean;
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={isCurrent ? 'text-accent' : undefined}
      >
        {sectionNumber(title)}
      </span>
      <span>{title}</span>
    </>
  );
}

const stripItemClassName = (isCurrent: boolean) =>
  cn(
    'flex h-11 cursor-pointer items-center gap-2 whitespace-nowrap border-b-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em]',
    isCurrent
      ? 'border-accent text-foreground'
      : 'border-transparent text-muted-foreground hover:text-foreground',
  );

interface DesktopNavigationProps {
  /** The sections the page renders, as SiteNavigation chose them. */
  navItems: NavigationItemType[];
  activeSection: string;
  isHomeActive: boolean;
  isBookmarksActive: boolean;
  /** The path being viewed, to mark its own section page in the strip. */
  pathname?: string;
  /** The search box, on the pages that offer one. */
  search?: React.ReactNode;
  /** How many resources the visitor has saved. */
  savedCount?: number;
}

export function DesktopNavigation({
  navItems,
  activeSection,
  isHomeActive,
  isBookmarksActive,
  pathname = '',
  search,
  savedCount = 0,
}: DesktopNavigationProps) {
  const isMac = useIsMac();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusItem = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  // The home and bookmarks pages list several sections, so the strip jumps
  // between them. Everywhere else - and on those pages when nothing is left
  // to list - it links every section page.
  const jumpsWithinPage =
    (isHomeActive || isBookmarksActive) && navItems.length > 0;

  return (
    <header
      aria-label="Site header"
      className="sticky top-0 z-40 hidden border-b border-foreground bg-background md:block"
    >
      <div className="container flex h-16 items-center gap-6">
        <div className="relative group">
          <Link
            href="/"
            className="font-serif text-[1.75rem] leading-none tracking-tight"
            aria-label={`Return to home page (${
              isMac ? '⌘H' : 'Ctrl+H'
            })`}
            aria-current={isHomeActive ? 'page' : undefined}
          >
            Web Development Hub
          </Link>
          <NavTooltip
            label="Home"
            shortcut={isMac ? '⌘H' : 'Ctrl+H'}
            alignClassName="left-0"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          {search}
          <div className="relative group">
            <Link
              href="/bookmarks"
              className={cn(
                'flex h-9 items-center gap-2 rounded-sm border px-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]',
                isBookmarksActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border hover:border-foreground',
              )}
              aria-label={`Navigate to bookmarks (${
                isMac ? '⌘B' : 'Ctrl+B'
              })`}
              aria-current={isBookmarksActive ? 'page' : undefined}
            >
              <BookmarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Saved
              {savedCount > 0 && (
                <span className="rounded-xs bg-accent px-1 text-accent-foreground">
                  {savedCount}
                </span>
              )}
            </Link>
            <NavTooltip
              label="Bookmarks"
              shortcut={isMac ? '⌘B' : 'Ctrl+B'}
            />
          </div>
          <div className="relative group">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm border border-border hover:border-foreground"
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
            <NavTooltip
              label="Toggle Theme"
              shortcut={isMac ? '⌘⇧L' : 'Ctrl+⇧L'}
            />
          </div>
        </div>
      </div>

      <nav
        aria-label="Page sections navigation"
        className="border-t border-border"
      >
        <span id="nav-description" className="sr-only">
          Use left and right arrow keys to navigate between sections
        </span>
        <ul className="container m-0 flex list-none items-center gap-7 overflow-x-auto [scrollbar-width:none]">
          {jumpsWithinPage
            ? navItems.map((item, index) => (
                <li key={item.id} className="shrink-0">
                  <button
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    onClick={() => scrollToSection(item.id)}
                    className={stripItemClassName(
                      activeSection === item.id,
                    )}
                    aria-label={`Navigate to ${item.title} section`}
                    aria-current={
                      activeSection === item.id ? 'page' : undefined
                    }
                    aria-describedby="nav-description"
                    onKeyDown={(e) => {
                      // Indexed refs rather than a selector: every button is
                      // the only element in its <li>, so :nth-of-type(n)
                      // matched them all at n=1 and nothing at all beyond it.
                      switch (e.key) {
                        case 'ArrowLeft':
                          e.preventDefault();
                          focusItem(Math.max(0, index - 1));
                          break;
                        case 'ArrowRight':
                          e.preventDefault();
                          focusItem(
                            Math.min(navItems.length - 1, index + 1),
                          );
                          break;
                        case 'Home':
                          e.preventDefault();
                          focusItem(0);
                          break;
                        case 'End':
                          e.preventDefault();
                          focusItem(navItems.length - 1);
                          break;
                      }
                    }}
                  >
                    <StripLabel
                      title={item.title}
                      isCurrent={activeSection === item.id}
                    />
                  </button>
                </li>
              ))
            : SECTIONS.map((section) => (
                <li key={section.href} className="shrink-0">
                  <Link
                    href={section.href}
                    className={stripItemClassName(
                      pathname === section.href,
                    )}
                    aria-current={
                      pathname === section.href ? 'page' : undefined
                    }
                  >
                    <StripLabel
                      title={section.title}
                      isCurrent={pathname === section.href}
                    />
                  </Link>
                </li>
              ))}
        </ul>
      </nav>
    </header>
  );
}
