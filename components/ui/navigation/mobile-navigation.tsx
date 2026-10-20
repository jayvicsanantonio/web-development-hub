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
import { BrandMark } from '@/components/ui/brand-mark';

const iconButtonClassName =
  'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground';

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
        'flex h-11 w-full items-center gap-3 rounded-lg px-3 text-[15px]',
        isActive
          ? 'bg-accent text-foreground font-medium'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon
        icon={iconName}
        className={cn(
          'h-5 w-5',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}
        aria-hidden="true"
      />
      <span>{title}</span>
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
      <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between gap-2 border-b border-border bg-background/90 px-4 backdrop-blur md:hidden">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-md text-[15px] font-semibold tracking-tight text-foreground"
        >
          <BrandMark />
          <span className="truncate">Web Dev Hub</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          {!hideSearch && (
            <>
              <button
                onClick={() => setIsSearchOpen((open) => !open)}
                className={cn(
                  iconButtonClassName,
                  isSearchOpen && 'bg-accent text-foreground'
                )}
                aria-expanded={isSearchOpen}
                aria-label="Search resources"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>
              <FilterButton />
            </>
          )}
          <Link
            href="/bookmarks"
            className={cn(
              iconButtonClassName,
              pathname === '/bookmarks' && 'text-primary'
            )}
            aria-label="View bookmarks"
            aria-current={pathname === '/bookmarks' ? 'page' : undefined}
          >
            <BookmarkIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
          <button
            onClick={toggleTheme}
            className={iconButtonClassName}
            aria-label="Switch between light and dark mode"
          >
            <Sun className="hidden dark:block h-5 w-5" aria-hidden="true" />
            <Moon className="block dark:hidden h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={cn(
              iconButtonClassName,
              isMobileMenuOpen && 'bg-accent text-foreground'
            )}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Main menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {!hideSearch && isSearchOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-50 border-b border-border bg-background p-3 shadow-lg md:hidden"
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
        className={`fixed top-16 left-0 right-0 bottom-0 z-40 overflow-y-auto bg-background p-3 md:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        inert={!isMobileMenuOpen}
      >
        <nav aria-label="Site sections">
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
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
