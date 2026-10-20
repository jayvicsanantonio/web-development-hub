// The desktop sidebar: the brand and theme toggle, links home, to the
// bookmarks and to every section page with their counts, and on the home and
// bookmarks pages the sections in view. Arrow keys rove focus through those.
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookmarkIcon, HomeIcon, Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@/lib/theme';
import {
  scrollToSection,
  type NavigationItem as NavigationItemType,
} from '@/lib/utils/navigation';
import { useRef } from 'react';
import { useIsMac } from '@/lib/hooks/use-is-mac';
import { SECTIONS } from '@/constants/sections';
import { Icon } from '@/lib/icons';
import { BrandMark } from '@/components/ui/brand-mark';

const linkClassName = (isActive: boolean) =>
  cn(
    'group flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] font-medium',
    isActive
      ? 'bg-background text-foreground shadow-xs ring-1 ring-border'
      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
  );

const countClassName =
  'ml-auto text-xs font-normal tabular-nums text-muted-foreground';

/** A shortcut hint, shown while its row is hovered. */
function Shortcut({ keys }: { keys: string }) {
  return (
    <kbd
      className="ml-auto hidden rounded border border-border bg-background px-1 font-sans text-[10px] leading-4 text-muted-foreground group-hover:inline"
      aria-hidden="true"
    >
      {keys}
    </kbd>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pb-1 pt-5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

interface DesktopNavigationProps {
  /** The sections the page renders, as VerticalNavigation chose them. */
  navItems: NavigationItemType[];
  activeSection: string;
  /** The page being viewed. */
  pathname: string;
  /** How many resources the visitor has saved. */
  bookmarkCount: number;
}

export function DesktopNavigation({
  navItems,
  activeSection,
  pathname,
  bookmarkCount,
}: DesktopNavigationProps) {
  const isMac = useIsMac();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isHomeActive = pathname === '/';
  const isBookmarksActive = pathname === '/bookmarks';

  const focusItem = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  return (
    <div className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col md:flex">
      <div className="flex h-14 shrink-0 items-center px-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-md text-sm font-semibold tracking-tight"
        >
          <BrandMark />
          <span className="truncate">Web Development Hub</span>
        </Link>
      </div>

      {/* Scrolls on its own: on a short window the list outgrows it. */}
      <div className="flex-1 overflow-y-auto px-3 pb-6">
        <nav aria-label="Site navigation">
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            <li>
              <Link
                href="/"
                className={linkClassName(isHomeActive)}
                aria-current={isHomeActive ? 'page' : undefined}
                aria-keyshortcuts={isMac ? 'Meta+H' : 'Control+H'}
              >
                <HomeIcon className="h-4 w-4" aria-hidden="true" />
                <span>Home</span>
                <Shortcut keys={isMac ? '⌘H' : 'Ctrl+H'} />
              </Link>
            </li>
            <li>
              <Link
                href="/bookmarks"
                className={linkClassName(isBookmarksActive)}
                aria-current={isBookmarksActive ? 'page' : undefined}
                aria-keyshortcuts={isMac ? 'Meta+B' : 'Control+B'}
              >
                <BookmarkIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                <span>Bookmarks</span>
                {bookmarkCount > 0 ? (
                  <>
                    {' '}
                    <span className={countClassName}>
                      {bookmarkCount}{' '}
                      <span className="sr-only">saved</span>
                    </span>
                  </>
                ) : (
                  <Shortcut keys={isMac ? '⌘B' : 'Ctrl+B'} />
                )}
              </Link>
            </li>
          </ul>

          <GroupLabel>Sections</GroupLabel>
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {SECTIONS.map((section) => {
              const isActive = pathname === section.href;
              return (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    className={linkClassName(isActive)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon
                      icon={section.icon}
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="truncate">{section.title}</span>{' '}
                    <span className={countClassName}>
                      {section.links.length}{' '}
                      <span className="sr-only">resources</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {(isHomeActive || isBookmarksActive) && (
          <nav aria-label="Page sections navigation">
            <span id="nav-description" className="sr-only">
              Use up and down arrow keys to navigate between sections
            </span>
            {navItems.length > 0 && (
              <GroupLabel>On this page</GroupLabel>
            )}
            <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        'flex h-7 w-full cursor-pointer items-center gap-2.5 rounded-md px-2 text-left text-[13px]',
                        isActive
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                      )}
                      aria-label={`Navigate to ${item.title} section`}
                      aria-current={isActive ? 'page' : undefined}
                      aria-describedby="nav-description"
                      onKeyDown={(e) => {
                        // Indexed refs rather than a selector: every button is
                        // the only element in its <li>, so :nth-of-type(n)
                        // matched them all at n=1 and nothing at all beyond it.
                        switch (e.key) {
                          case 'ArrowUp':
                            e.preventDefault();
                            focusItem(Math.max(0, index - 1));
                            break;
                          case 'ArrowDown':
                            e.preventDefault();
                            focusItem(
                              Math.min(
                                navItems.length - 1,
                                index + 1,
                              ),
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
                      <span
                        className={cn(
                          'h-1.5 w-1.5 shrink-0 rounded-full',
                          isActive ? 'bg-primary' : 'bg-border',
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-t border-border px-4">
        <p className="text-xs text-muted-foreground">
          Press{' '}
          <kbd className="rounded border border-border bg-background px-1 font-sans text-[10px] leading-4">
            {isMac ? '⌘K' : 'Ctrl+K'}
          </kbd>{' '}
          to search
        </p>
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label={`Switch between light and dark mode (${
            isMac ? '⌘⇧L' : 'Ctrl+Shift+L'
          })`}
          title={`Switch theme (${isMac ? '⌘⇧L' : 'Ctrl+Shift+L'})`}
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
    </div>
  );
}
