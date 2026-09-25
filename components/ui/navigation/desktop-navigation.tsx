// The fixed side rail: home, bookmarks, the sections of the current page, and
// the theme toggle. Arrow keys rove focus through the section buttons.
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookmarkIcon, HomeIcon, Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@/lib/theme';
import { type NavigationItem as NavigationItemType } from '@/lib/utils/navigation';
import { useCallback, useRef, useMemo } from 'react';
import { useBookmarks } from '@/contexts/bookmarks-context';
import { useIsMac } from '@/lib/hooks/use-is-mac';

/**
 * The label beside a rail button, shown on hover or keyboard focus. It keys on
 * :focus-visible rather than any focus, so a mouse click, which leaves focus
 * on the button, does not keep the label up after the pointer moves away.
 */
function NavTooltip({
  label,
  shortcut,
  offsetClassName = 'right-12',
  shortcutClassName = 'w-10',
  ariaHidden,
}: {
  label: string;
  shortcut?: string;
  offsetClassName?: string;
  shortcutClassName?: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className={cn(
        'absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-200 whitespace-nowrap pointer-events-none',
        offsetClassName,
        'opacity-0 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100',
      )}
      role="tooltip"
      aria-hidden={ariaHidden}
    >
      <div className="bg-popover/90 backdrop-blur-[20px] px-3 py-2 rounded-md text-sm font-medium text-popover-foreground flex items-center gap-2 border border-border shadow-md">
        {label}
        {shortcut && (
          <div
            className={cn(
              'h-5 rounded-md bg-muted border border-border/50 flex items-center justify-center text-[10px] font-medium text-muted-foreground px-1 tracking-tight leading-none',
              shortcutClassName,
            )}
          >
            {shortcut}
          </div>
        )}
      </div>
    </div>
  );
}

interface DesktopNavigationProps {
  navItems: NavigationItemType[];
  activeSection: string;
  isHomeActive: boolean;
  isBookmarksActive: boolean;
  onScrollToSection: (id: string) => void;
}

export function DesktopNavigation({
  navItems,
  activeSection,
  isHomeActive,
  isBookmarksActive,
  onScrollToSection,
}: DesktopNavigationProps) {
  const isMac = useIsMac();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { bookmarks } = useBookmarks();

  const favoritedSections = useMemo(() => {
    const sections = new Set<string>();
    bookmarks.forEach((favorite) => {
      sections.add(favorite.section);
    });
    return sections;
  }, [bookmarks]);

  // The bookmarks page only lists sections the visitor actually saved into.
  const filteredNavItems = useMemo(() => {
    return isBookmarksActive
      ? navItems.filter((item) => favoritedSections.has(item.title))
      : navItems;
  }, [navItems, favoritedSections, isBookmarksActive]);

  const focusItem = useCallback((index: number) => {
    itemRefs.current[index]?.focus();
  }, []);

  return (
    <nav
      aria-label="Page sections navigation"
      className="fixed right-10 top-1/2 transform -translate-y-1/2 z-30 hidden md:flex p-3 bg-background-primary/1 backdrop-blur rounded-2xl shadow-md border border-border/20 transition-all duration-300"
      role="navigation"
    >
      <span id="nav-description" className="sr-only">
        Use up and down arrow keys to navigate between sections
      </span>
      <ul className="list-none m-0 p-0 flex flex-col items-center gap-8">
        <li className="relative group">
          <Link
            href="/"
            className="desktop-nav-button-link flex items-center justify-center w-10 h-10 transition-all duration-300"
            aria-label={`Return to home page (${
              isMac ? '⌘H' : 'Ctrl+H'
            })`}
            aria-current={isHomeActive ? 'page' : undefined}
          >
            <HomeIcon
              className={cn(
                'h-5 w-5',
                isHomeActive
                  ? 'text-accent-neon opacity-100 stroke-2'
                  : 'text-foreground opacity-75 group-hover:opacity-100',
              )}
            />
          </Link>
          <NavTooltip
            label="Home"
            shortcut={isMac ? '⌘H' : 'Ctrl+H'}
          />
        </li>
        <li className="relative group">
          <Link
            href="/bookmarks"
            className="desktop-nav-button-link flex items-center justify-center w-10 h-10 transition-all duration-300"
            aria-label={`Navigate to bookmarks (${
              isMac ? '⌘B' : 'Ctrl+B'
            })`}
            aria-current={isBookmarksActive ? 'page' : undefined}
          >
            <BookmarkIcon
              className={cn(
                'h-5 w-5',
                isBookmarksActive
                  ? 'text-accent-neon opacity-100 stroke-2'
                  : 'text-foreground opacity-75 group-hover:opacity-100',
              )}
            />
          </Link>
          <NavTooltip
            label="Bookmarks"
            shortcut={isMac ? '⌘B' : 'Ctrl+B'}
          />
        </li>

        {(isHomeActive || isBookmarksActive) &&
          filteredNavItems.length > 0 && (
            <li className="w-full">
              <div
                className="h-px w-6 bg-border/50 mx-auto"
                aria-hidden="true"
              ></div>
            </li>
          )}

        {(isHomeActive || isBookmarksActive) &&
          filteredNavItems.map((item, index) => (
            <li key={item.id} className="relative group">
              <button
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => onScrollToSection(item.id)}
                className={cn(
                  'cursor-pointer w-3 h-3 rounded-full transition-all duration-300  focus:ring-2 focus:ring-accent-neon focus:ring-offset-2',
                  activeSection === item.id
                    ? 'bg-foreground shadow-sm ring-2 ring-foreground/20'
                    : 'bg-foreground/40 hover:bg-foreground/60 hover:scale-110',
                )}
                aria-label={`Navigate to ${item.title} section`}
                aria-current={
                  activeSection === item.id ? 'page' : undefined
                }
                aria-describedby="nav-description"
                onKeyDown={(e) => {
                  // Indexed refs rather than a selector: every button is the
                  // only element in its <li>, so :nth-of-type(n) matched them
                  // all at n=1 and nothing at all beyond it.
                  switch (e.key) {
                    case 'ArrowUp':
                      e.preventDefault();
                      focusItem(Math.max(0, index - 1));
                      break;
                    case 'ArrowDown':
                      e.preventDefault();
                      focusItem(
                        Math.min(
                          filteredNavItems.length - 1,
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
                      focusItem(filteredNavItems.length - 1);
                      break;
                  }
                }}
              />
              <NavTooltip
                label={item.title}
                offsetClassName="right-14"
                ariaHidden={activeSection !== item.id}
              />
            </li>
          ))}

        <li className="w-full">
          <div
            className="h-px w-6 bg-border/50 mx-auto"
            aria-hidden="true"
          ></div>
        </li>

        <li className="relative group">
          <button
            onClick={toggleTheme}
            className="cursor-pointer desktop-nav-button-link flex items-center justify-center w-10 h-10 transition-all duration-300"
            aria-label={`Switch between light and dark mode (${
              isMac ? '⌘⇧L' : 'Ctrl+Shift+L'
            })`}
          >
            <Sun
              className="hidden dark:block h-5 w-5 text-foreground opacity-75 group-hover:opacity-100"
              aria-hidden="true"
            />
            <Moon
              className="block dark:hidden h-5 w-5 text-foreground opacity-75 group-hover:opacity-100"
              aria-hidden="true"
            />
          </button>
          <NavTooltip
            label="Toggle Theme"
            shortcut={isMac ? '⌘⇧L' : 'Ctrl+⇧L'}
            shortcutClassName="w-12"
          />
        </li>
      </ul>
    </nav>
  );
}
