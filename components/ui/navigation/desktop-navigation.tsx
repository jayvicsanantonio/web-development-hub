'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookmarkIcon, HomeIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { NavigationItem } from '@/components/ui/navigation-item';
import { type NavigationItem as NavigationItemType } from '@/lib/utils/navigation';
import { useState, useEffect, useMemo } from 'react';
import { useFavorites } from '@/contexts/favorites-context';

interface DesktopNavigationProps {
  navItems: NavigationItemType[];
  activeSection: string;
  isHomeActive: boolean;
  isFavoritesActive: boolean;
  onScrollToSection: (id: string) => void;
}

export function DesktopNavigation({
  navItems,
  activeSection,
  isHomeActive,
  isFavoritesActive,
  onScrollToSection,
}: DesktopNavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [hiddenTooltip, setHiddenTooltip] = useState<string | null>(
    null
  );

  // Get favorites from context
  const { favorites } = useFavorites();

  // Get unique sections from favorites
  const favoritedSections = useMemo(() => {
    const sections = new Set<string>();
    favorites.forEach((favorite) => {
      sections.add(favorite.section);
    });
    return sections;
  }, [favorites]);

  // Filter navItems based on which sections have favorites
  const filteredNavItems = useMemo(() => {
    // If on home page, show all nav items
    if (isHomeActive) {
      return navItems;
    }

    // If on favorites page, only show sections that have favorites
    return navItems.filter((item) =>
      favoritedSections.has(item.title)
    );
  }, [navItems, favoritedSections, isHomeActive]);

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
      className="fixed right-10 top-1/2 transform -translate-y-1/2 z-30 hidden md:flex p-3 bg-background-secondary/70 backdrop-blur-md rounded-2xl shadow-md border border-white/10 transition-all duration-300 hover:bg-background-secondary/80"
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
                  ? 'text-foreground opacity-100 stroke-[3]'
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
            <div className="dark:bg-black/90 bg-white/90 backdrop-blur-md px-3 py-2 rounded-md text-sm font-medium text-foreground flex items-center border border-border shadow-md">
              Home
            </div>
          </div>
        </li>
        <li className="relative group">
          <Link
            href="/favorites"
            className="desktop-nav-button-link flex items-center justify-center w-10 h-10 transition-all duration-300"
            aria-label="Navigate to favorites"
            aria-current={isFavoritesActive ? 'page' : undefined}
            onClick={() => setHiddenTooltip('favorites')}
          >
            <BookmarkIcon
              className={cn(
                'h-5 w-5',
                isFavoritesActive
                  ? 'text-foreground opacity-100 stroke-[3]'
                  : 'text-foreground opacity-75 group-hover:opacity-100'
              )}
            />
          </Link>
          <div
            className={cn(
              'absolute right-12 top-1/2 transform -translate-y-1/2 transition-opacity duration-200 whitespace-nowrap pointer-events-none',
              hiddenTooltip === 'favorites'
                ? 'opacity-0'
                : 'opacity-0 group-hover:opacity-100'
            )}
            role="tooltip"
          >
            <div className="dark:bg-black/90 bg-white/90 backdrop-blur-md px-3 py-2 rounded-md text-sm font-medium text-foreground flex items-center border border-border shadow-md">
              Favorites
            </div>
          </div>
        </li>

        {(isHomeActive || isFavoritesActive) && (
          <li className="w-full">
            <div
              className="h-px w-6 bg-border/50 mx-auto"
              aria-hidden="true"
            ></div>
          </li>
        )}

        {(isHomeActive || isFavoritesActive) &&
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
                          `.desktop-nav-button:nth-of-type(${
                            index + 2
                          })`
                        ) as HTMLElement;
                        prevButton?.focus();
                      }
                      break;
                    case 'ArrowDown':
                      e.preventDefault();
                      if (index < filteredNavItems.length - 1) {
                        const nextButton = document.querySelector(
                          `.desktop-nav-button:nth-of-type(${
                            index + 4
                          })`
                        ) as HTMLElement;
                        nextButton?.focus();
                      }
                      break;
                    case 'Home':
                      e.preventDefault();
                      const firstButton = document.querySelector(
                        `.desktop-nav-button:nth-of-type(3)`
                      ) as HTMLElement;
                      firstButton?.focus();
                      break;
                    case 'End':
                      e.preventDefault();
                      const lastButton = document.querySelector(
                        `.desktop-nav-button:nth-of-type(${
                          filteredNavItems.length + 2
                        })`
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
                <div className="dark:bg-black/90 bg-white/90 backdrop-blur-md px-3 py-2 rounded-md text-sm font-medium text-foreground flex items-center border border-border shadow-md">
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
            <div className="dark:bg-black/90 bg-white/90 backdrop-blur-md px-3 py-2 rounded-md text-sm font-medium text-foreground flex items-center border border-border shadow-md">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
