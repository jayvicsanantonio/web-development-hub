'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, BookmarkIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { SearchInput } from '@/components/ui/search-input';
import { NavigationItem } from '@/components/ui/navigation-item';
import { type NavigationItem as NavigationItemType } from '@/lib/utils/navigation';

interface MobileNavigationProps {
  navItems: NavigationItemType[];
  activeSection: string;
  onScrollToSection: (id: string) => void;
  hideSearch?: boolean;
}

export function MobileNavigation({
  navItems,
  activeSection,
  onScrollToSection,
  hideSearch = false,
}: MobileNavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const handleSearchComplete = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleNavigationClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-background md:hidden">
        <Link
          href="/"
          className="text-foreground font-bold text-xl focus:outline-none focus:ring-2 focus:ring-accent-neon focus:rounded-md"
        >
          Web Development Hub
        </Link>
        <div className="flex gap-2">
          {!hideSearch && (
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full bg-background-secondary hover:bg-background-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon cursor-pointer"
              aria-expanded={isSearchOpen}
              aria-label="Search resources"
            >
              <Search
                className="h-5 w-5 text-foreground"
                aria-hidden="true"
              />
            </button>
          )}
          <Link
            href="/favorites"
            className="p-2 rounded-full bg-background-secondary hover:bg-background-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon flex items-center justify-center"
            aria-label="View favorites"
          >
            <BookmarkIcon
              className="h-5 w-5 text-foreground"
              aria-hidden="true"
            />
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-background-secondary hover:bg-background-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon cursor-pointer"
            aria-label={
              theme === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {theme === 'dark' ? (
              <Sun
                className="h-5 w-5 text-foreground"
                aria-hidden="true"
              />
            ) : (
              <Moon
                className="h-5 w-5 text-foreground"
                aria-hidden="true"
              />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-background-secondary hover:bg-background-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon cursor-pointer"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Main menu"
          >
            <Menu
              className="h-5 w-5 text-foreground"
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {!hideSearch && isSearchOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-50 p-4 bg-background md:hidden"
          id="mobile-search"
          role="search"
        >
          <SearchInput
            isMobile={true}
            onSubmit={handleSearchComplete}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsSearchOpen(false);
              }
            }}
          />
        </div>
      )}

      <div
        id="mobile-menu"
        className={`fixed top-16 left-0 right-0 z-40 bg-background p-4 shadow-lg md:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <nav aria-label="Site sections">
          <ul className="flex flex-col gap-4 list-none m-0 p-0 min-h-[calc(100vh-8rem)]">
            <li>
              <NavigationItem
                item={{
                  id: 'home',
                  title: 'Home',
                  icon: undefined,
                }}
                isActive={pathname === '/'}
                href="/"
                onClick={handleNavigationClick}
                variant="mobile"
                index={0}
                totalItems={navItems.length + 1}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextButton = document.querySelector(
                      '#mobile-menu button:nth-of-type(2)'
                    ) as HTMLElement;
                    nextButton?.focus();
                  }
                }}
              />
            </li>
            {navItems.map((item, index) => {
              const getPageUrl = (sectionId: string) => {
                const urlMap: Record<string, string> = {
                  'section-learning-resources': '/learning-resources',
                  'section-developer-tools': '/developer-tools',
                  'section-frameworks-and-libraries':
                    '/frameworks-and-libraries',
                  'section-communities': '/communities',
                  'section-blogs': '/blogs',
                };
                return urlMap[sectionId] || '/';
              };

              const pageUrl = getPageUrl(item.id);
              const isActive = pathname === pageUrl;

              return (
                <li key={item.id}>
                  <NavigationItem
                    item={item}
                    isActive={isActive}
                    href={pageUrl}
                    onClick={handleNavigationClick}
                    variant="mobile"
                    index={index + 1}
                    totalItems={navItems.length + 1}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'ArrowDown' &&
                        index < navItems.length - 1
                      ) {
                        e.preventDefault();
                        const nextButton = document.querySelector(
                          `#mobile-menu button:nth-of-type(${
                            index + 3
                          })`
                        ) as HTMLElement;
                        nextButton?.focus();
                      } else if (e.key === 'ArrowUp' && index > 0) {
                        e.preventDefault();
                        const prevButton = document.querySelector(
                          `#mobile-menu button:nth-of-type(${
                            index + 1
                          })`
                        ) as HTMLElement;
                        prevButton?.focus();
                      } else if (e.key === 'ArrowUp' && index === 0) {
                        e.preventDefault();
                        const homeButton = document.querySelector(
                          '#mobile-menu button:nth-of-type(1)'
                        ) as HTMLElement;
                        homeButton?.focus();
                      }
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
