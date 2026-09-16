// The fixed side rail: home, bookmarks, the sections of the current page, and
// the theme toggle. Arrow keys rove focus through the section buttons.
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookmarkIcon, HomeIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { NavigationItem } from '@/components/ui/navigation-item';
import { type NavigationItem as NavigationItemType } from '@/lib/utils/navigation';
import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useBookmarks } from '@/contexts/bookmarks-context';
import { useIsMac } from '@/lib/hooks/use-is-mac';

/**
 * The hover/focus label beside a rail button. `isSuppressed` hides it after a
 * click, so the tooltip does not linger over the thing the click navigated to.
 */
function NavTooltip({
  label,
  shortcut,
  isSuppressed,
  offsetClassName = 'right-12',
  shortcutClassName = 'w-10',
  ariaHidden,
}: {
  label: string;
  shortcut?: string;
  isSuppressed: boolean;
  offsetClassName?: string;
  shortcutClassName?: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className={cn(
        'absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-200 whitespace-nowrap will-change-[opacity,transform] pointer-events-none',
        offsetClassName,
        isSuppressed
          ? 'opacity-0'
          : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
      )}
      role="tooltip"
      aria-hidden={ariaHidden}
    >
      <div className="bg-popover/90 backdrop-blur-[20px] px-3 py-2 rounded-md text-sm font-medium text-popover-foreground flex items-center gap-2 border border-border shadow-md transform-gpu">
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
  const { toggleTheme } = useTheme();
  const [hiddenTooltip, setHiddenTooltip] = useState<string | null>(
    null,
  );
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

  useEffect(() => {
    if (hiddenTooltip) {
      const timer = setTimeout(() => {
        setHiddenTooltip(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hiddenTooltip]);

  return (
    <nav
      aria-label="Page sections navigation"
      className="fixed right-10 top-1/2 transform -translate-y-1/2 z-30 hidden md:flex p-3 bg-background-primary/1 backdrop-blur rounded-2xl shadow-md border border-border/20 transition-all duration-300 transform-gpu"
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
            onClick={() => setHiddenTooltip('home')}
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
            isSuppressed={hiddenTooltip === 'home'}
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
            onClick={() => setHiddenTooltip('bookmarks')}
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
            isSuppressed={hiddenTooltip === 'bookmarks'}
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
              <NavigationItem
                item={item}
                isActive={activeSection === item.id}
                onClick={() => {
                  onScrollToSection(item.id);
                  setHiddenTooltip(item.id);
                }}
                variant="desktop"
                aria-describedby="nav-description"
                ref={(el) => {
                  itemRefs.current[index] = el as HTMLButtonElement;
                }}
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
                isSuppressed={hiddenTooltip === item.id}
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
            onClick={() => {
              toggleTheme();
              setHiddenTooltip('theme');
            }}
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
            isSuppressed={hiddenTooltip === 'theme'}
            shortcutClassName="w-12"
          />
        </li>
      </ul>
    </nav>
  );
}
