// The mobile top bar - search, bookmarks, the theme toggle - and its menu of
// the home page and the section pages. Hidden from the md breakpoint up.
'use client';

import { SECTIONS } from '@/constants/sections';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, BookmarkIcon, Moon, Sun } from 'lucide-react';
import { toggleTheme } from '@/lib/theme';
import { SearchInput } from '@/components/ui/search-input';
import { FilterButton } from '@/components/ui/filter-button';
import { Icon } from '@/lib/icons';
import { cn } from '@/lib/utils';

/** One row of the mobile menu: the page's icon and title, as a link. */
function MenuLink({
  title,
  iconName,
  href,
  isActive,
  onClick,
  onKeyDown,
  ref,
}: {
  title: string;
  iconName: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: React.Ref<HTMLAnchorElement>;
}) {
  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={cn(
        'flex w-full items-center gap-3 p-3 rounded-md transition-all duration-200  focus:ring-2 focus:ring-accent-neon',
        isActive
          ? 'bg-background-muted/50 border-l-2 border-accent-neon text-accent-neon font-medium'
          : 'hover:bg-background-muted/30 border-l-2 border-transparent'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon
        icon={iconName}
        className={cn(
          'h-5 w-5',
          isActive
            ? 'text-foreground opacity-90'
            : 'text-foreground opacity-70'
        )}
        aria-hidden="true"
      />
      <span className={cn(isActive ? 'font-medium' : 'font-normal')}>
        {title}
      </span>
    </Link>
  );
}

interface MobileNavigationProps {
  hideSearch?: boolean;
}

export function MobileNavigation({
  hideSearch = false,
}: MobileNavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleSearchComplete = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleNavigationClick = () => {
    setIsMobileMenuOpen(false);
  };

  const focusNextItem = (currentIndex: number) => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < navItemRefs.current.length) {
      navItemRefs.current[nextIndex]?.focus();
    }
  };

  const focusPreviousItem = (currentIndex: number) => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      navItemRefs.current[prevIndex]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusNextItem(index);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusPreviousItem(index);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-background md:hidden">
        <Link
          href="/"
          className="text-foreground font-bold text-xl  focus:ring-2 focus:ring-accent-neon focus:rounded-md"
        >
          Web Development Hub
        </Link>
        <div className="flex gap-2">
          {!hideSearch && (
            <>
              <button
                onClick={() => setIsSearchOpen((open) => !open)}
                className="p-2 rounded-full transition-colors  cursor-pointer"
                aria-expanded={isSearchOpen}
                aria-label="Search resources"
              >
                <Search
                  className="h-5 w-5 text-foreground"
                  aria-hidden="true"
                />
              </button>
              <FilterButton />
            </>
          )}
          <Link
            href="/bookmarks"
            className="p-2 rounded-full transition-colors  flex items-center justify-center"
            aria-label="View bookmarks"
          >
            <BookmarkIcon
              className={cn(
                'h-5 w-5',
                pathname === '/bookmarks'
                  ? 'text-accent-neon'
                  : 'text-foreground'
              )}
              aria-hidden="true"
            />
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors  cursor-pointer"
            aria-label="Switch between light and dark mode"
          >
            <Sun
              className="hidden dark:block h-5 w-5 text-foreground"
              aria-hidden="true"
            />
            <Moon
              className="block dark:hidden h-5 w-5 text-foreground"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="p-2 rounded-full transition-colors  cursor-pointer"
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
        inert={!isMobileMenuOpen}
      >
        <nav aria-label="Site sections">
          <ul className="flex flex-col gap-4 list-none m-0 p-0 min-h-[calc(100vh-8rem)]">
            <li>
              <MenuLink
                title="Home"
                iconName="mdi:home-outline"
                href="/"
                isActive={pathname === '/'}
                onClick={handleNavigationClick}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                ref={(el) => {
                  navItemRefs.current[0] = el;
                }}
              />
            </li>
            {SECTIONS.map((section, index) => {
              const itemIndex = index + 1;

              return (
                <li key={section.href}>
                  <MenuLink
                    title={section.title}
                    iconName={section.icon}
                    href={section.href}
                    isActive={pathname === section.href}
                    onClick={handleNavigationClick}
                    onKeyDown={(e) => handleKeyDown(e, itemIndex)}
                    ref={(el) => {
                      navItemRefs.current[itemIndex] = el;
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
