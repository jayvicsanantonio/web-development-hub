'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookmarkIcon, HomeIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { NavigationItem } from '@/components/ui/navigation-item';
import { type NavigationItem as NavigationItemType } from '@/lib/utils/navigation';
import { useState, useEffect, useMemo } from 'react';
import { useBookmarks } from '@/contexts/bookmarks-context';

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
  const { theme, toggleTheme } = useTheme();
  const [hiddenTooltip, setHiddenTooltip] = useState<string | null>(
    null
  );
  const [isMac, setIsMac] = useState(false);

  const { bookmarks } = useBookmarks();

  const favoritedSections = useMemo(() => {
    const sections = new Set<string>();
    bookmarks.forEach((favorite) => {
      sections.add(favorite.section);
    });
    return sections;
  }, [bookmarks]);

  const filteredNavItems = useMemo(() => {
    if (isHomeActive) {
      return navItems;
    }

    if (isBookmarksActive) {
      return navItems.filter((item) =>
        favoritedSections.has(item.title)
      );
    }

    return navItems;
  }, [navItems, favoritedSections, isHomeActive, isBookmarksActive]);

  useEffect(() => {
    if (hiddenTooltip) {
      const timer = setTimeout(() => {
        setHiddenTooltip(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hiddenTooltip]);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

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
            aria-label="Return to home page"
            aria-current={isHomeActive ? 'page' : undefined}
            onClick={() => setHiddenTooltip('home')}
          >
            <HomeIcon
              className={cn(
                'h-5 w-5',
                isHomeActive
                  ? 'text-accent-neon opacity-100 stroke-2'
                  : 'text-foreground opacity-75 group-hover:opacity-100'
              )}
            />
          </Link>
          <div
            className={cn(
              'absolute right-12 top-1/2 transform -translate-y-1/2 transition-opacity duration-200 whitespace-nowrap pointer-events-none',
              hiddenTooltip === 'home'
                ? 'opacity-0'
                : 'opacity-0 group-hover:opacity-100'
            )}
            role="tooltip"
          >
            <div className="bg-popover/90 backdrop-blur-optimized px-3 py-2 rounded-md text-sm font-medium text-popover-foreground flex items-center border border-border shadow-md transform-gpu">
              Home
            </div>
          </div>
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
                  : 'text-foreground opacity-75 group-hover:opacity-100'
              )}
            />
          </Link>
          <div
            className={cn(
              'absolute right-12 top-1/2 transform -translate-y-1/2 transition-opacity duration-200 whitespace-nowrap pointer-events-none',
              hiddenTooltip === 'bookmarks'
                ? 'opacity-0'
                : 'opacity-0 group-hover:opacity-100'
            )}
            role="tooltip"
          >
            <div className="bg-popover/90 backdrop-blur-optimized px-3 py-2 rounded-md text-sm font-medium text-popover-foreground flex items-center gap-2 border border-border shadow-md transform-gpu">
              Bookmarks
              <div className="h-5 w-10 rounded-md bg-muted border border-border/50 flex items-center justify-center text-[10px] font-medium text-muted-foreground px-1 tracking-tight leading-none">
                {isMac ? '⌘B' : 'Ctrl+B'}
              </div>
            </div>
          </div>
        </li>

        {((isHomeActive && filteredNavItems.length > 0) ||
          (isBookmarksActive && filteredNavItems.length > 0)) && (
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
                index={index}
                totalItems={filteredNavItems.length}
                aria-describedby="nav-description"
                onKeyDown={(e) => {
                  switch (e.key) {
                    case 'ArrowUp':
                      e.preventDefault();
                      if (index > 0) {
                        const prevButton = document.querySelector(
                          `.desktop-nav-button:nth-of-type(${index})`
                        ) as HTMLElement;
                        prevButton?.focus();
                      }
                      break;
                    case 'ArrowDown':
                      e.preventDefault();
                      if (index < filteredNavItems.length - 1) {
                        const nextButton = document.querySelector(
                          `.desktop-nav-button:nth-of-type(${
                            index + 2
                          })`
                        ) as HTMLElement;
                        nextButton?.focus();
                      }
                      break;
                    case 'Home':
                      e.preventDefault();
                      const firstButton = document.querySelector(
                        `.desktop-nav-button:nth-of-type(1)`
                      ) as HTMLElement;
                      firstButton?.focus();
                      break;
                    case 'End':
                      e.preventDefault();
                      const lastButton = document.querySelector(
                        `.desktop-nav-button:nth-of-type(${filteredNavItems.length})`
                      ) as HTMLElement;
                      lastButton?.focus();
                      break;
                  }
                }}
              />
              <div
                className={cn(
                  'absolute right-14 top-1/2 transform -translate-y-1/2 transition-opacity duration-200 whitespace-nowrap will-change-[opacity,transform] pointer-events-none',
                  hiddenTooltip === item.id
                    ? 'opacity-0'
                    : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'
                )}
                role="tooltip"
                aria-hidden={activeSection !== item.id}
              >
                <div className="bg-popover/90 backdrop-blur-optimized px-3 py-2 rounded-md text-sm font-medium text-popover-foreground flex items-center border border-border shadow-md transform-gpu">
                  {item.title}
                </div>
              </div>
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
            aria-label={
              theme === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {theme === 'dark' ? (
              <Sun
                className="h-5 w-5 text-foreground opacity-75 group-hover:opacity-100"
                aria-hidden="true"
              />
            ) : (
              <Moon
                className="h-5 w-5 text-foreground opacity-75 group-hover:opacity-100"
                aria-hidden="true"
              />
            )}
          </button>
          <div
            className={cn(
              'absolute right-12 top-1/2 transform -translate-y-1/2 transition-opacity duration-200 whitespace-nowrap pointer-events-none',
              hiddenTooltip === 'theme'
                ? 'opacity-0'
                : 'opacity-0 group-hover:opacity-100'
            )}
            role="tooltip"
          >
            <div className="bg-popover/90 backdrop-blur-optimized px-3 py-2 rounded-md text-sm font-medium text-popover-foreground flex items-center border border-border shadow-md transform-gpu">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
