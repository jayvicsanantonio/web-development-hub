'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SECTIONS } from '@/constants/sections';
import {
  Menu,
  Search,
  BookmarkIcon,
  HomeIcon,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useSearch } from '@/contexts/search-context';
import { SearchInput } from '@/components/ui/search-input';
type NavigationItem = {
  id: string;
  title: string;
  icon: React.FC<{ className?: string }>;
};
export default function VerticalNavigation() {
  const router = useRouter();
  const [activeSection, setActiveSection] =
    useState<string>('learning');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchQuery } = useSearch();
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSearchComplete = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const [navItems, setNavItems] = useState<NavigationItem[]>([
    {
      id: 'section-learning-resources',
      title: 'Learning Resources',
      icon: SECTIONS[0].icon,
    },
    {
      id: 'section-developer-tools',
      title: 'Developer Tools',
      icon: SECTIONS[1].icon,
    },
    {
      id: 'section-frameworks-&-libraries',
      title: 'Frameworks & Libraries',
      icon: SECTIONS[2].icon,
    },
    {
      id: 'section-communities',
      title: 'Communities',
      icon: SECTIONS[3].icon,
    },
    { id: 'section-blogs', title: 'Blogs', icon: SECTIONS[4].icon },
  ]);

  useEffect(() => {
    const updateNavItems = () => {
      const sections = document.querySelectorAll('section[id]');

      if (searchQuery && searchQuery.trim().length > 0) {
        const sectionsWithContent = Array.from(sections).filter(
          (section) => {
            const gridContainer = section.querySelector('.grid');
            return gridContainer && gridContainer.children.length > 0;
          }
        );

        const sectionIdsWithContent = sectionsWithContent.map(
          (section) => section.id
        );

        const searchNavItems = sectionIdsWithContent
          .filter((id) => id.startsWith('section-'))
          .map((id) => {
            const displayName = id
              .replace('section-', '')
              .split('-')
              .map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(' ')
              .replace(/\b[aA][nN][dD]\b/g, '&');

            const matchingSection = SECTIONS.find(
              (section) =>
                section.title.toLowerCase() ===
                  displayName.toLowerCase() ||
                section.title
                  .toLowerCase()
                  .replace(' & ', ' and ') ===
                  displayName.toLowerCase()
            );

            return {
              id,
              title: displayName,
              icon: matchingSection?.icon || SECTIONS[0].icon,
            };
          });

        setNavItems(searchNavItems.length > 0 ? searchNavItems : []);
      } else {
        setNavItems([
          {
            id: 'section-learning-resources',
            title: 'Learning Resources',
            icon: SECTIONS[0].icon,
          },
          {
            id: 'section-developer-tools',
            title: 'Developer Tools',
            icon: SECTIONS[1].icon,
          },
          {
            id: 'section-frameworks-&-libraries',
            title: 'Frameworks & Libraries',
            icon: SECTIONS[2].icon,
          },
          {
            id: 'section-communities',
            title: 'Communities',
            icon: SECTIONS[3].icon,
          },
          {
            id: 'section-blogs',
            title: 'Blogs',
            icon: SECTIONS[4].icon,
          },
        ]);
      }
    };

    updateNavItems();
  }, [searchQuery]);
  const handleScroll = useCallback(() => {
    const isFavoritesPage = window.location.pathname === '/favorites';
    setIsFavoritesActive(isFavoritesPage);

    if (isFavoritesPage) {
      return;
    }

    const sections = document.querySelectorAll('section[id]');
    let current = '';
    let nearestSection = Infinity;
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    sections.forEach((section) => {
      const sectionRect = section.getBoundingClientRect();
      const sectionCenter = sectionRect.top + sectionRect.height / 2;
      const distanceFromCenter = Math.abs(
        sectionCenter - viewportCenter
      );
      const isVisible =
        (sectionRect.top >= 0 && sectionRect.top <= viewportHeight) ||
        (sectionRect.bottom >= 0 &&
          sectionRect.bottom <= viewportHeight) ||
        (sectionRect.top <= 0 &&
          sectionRect.bottom >= viewportHeight);
      if (isVisible && distanceFromCenter < nearestSection) {
        nearestSection = distanceFromCenter;
        current = section.getAttribute('id') || '';
      }
    });
    if (current && current !== activeSection) {
      setActiveSection(current);
    }
  }, [activeSection]);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };
  useEffect(() => {
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', scrollListener, {
      passive: true,
    });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [handleScroll]);
  return (
    <>
      {}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-background md:hidden">
        <Link
          href="/"
          className="text-foreground font-bold text-xl focus:outline-none focus:ring-2 focus:ring-accent-neon focus:rounded-md"
        >
          Web Development Hub
        </Link>
        <div className="flex gap-2">
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
      {}
      {isSearchOpen && (
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
      {}
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
              <Link
                href="/"
                className="flex w-full items-center gap-3 p-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon hover:bg-background-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HomeIcon
                  className="h-5 w-5 text-foreground"
                  aria-hidden="true"
                />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className={cn(
                  'flex w-full items-center gap-3 p-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon',
                  isFavoritesActive
                    ? 'bg-background-secondary text-accent-neon'
                    : 'hover:bg-background-muted'
                )}
                aria-current={isFavoritesActive ? 'page' : undefined}
              >
                <BookmarkIcon
                  className={cn(
                    'h-5 w-5',
                    isFavoritesActive
                      ? 'text-accent-neon'
                      : 'text-foreground'
                  )}
                  aria-hidden="true"
                />
                <span className="font-medium">Favorites</span>
              </Link>
            </li>
            {navItems.map((item, index) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 p-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon',
                    activeSection === item.id
                      ? 'bg-background-secondary text-accent-neon'
                      : 'hover:bg-background-muted'
                  )}
                  aria-current={
                    activeSection === item.id ? 'page' : undefined
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === 'ArrowDown' &&
                      index < navItems.length - 1
                    ) {
                      e.preventDefault();
                      const nextButton = document.querySelector(
                        `#mobile-menu button:nth-of-type(${
                          index + 2
                        })`
                      ) as HTMLElement;
                      nextButton?.focus();
                    } else if (e.key === 'ArrowUp' && index > 0) {
                      e.preventDefault();
                      const prevButton = document.querySelector(
                        `#mobile-menu button:nth-of-type(${index})`
                      ) as HTMLElement;
                      prevButton?.focus();
                    }
                  }}
                >
                  <item.icon
                    className={cn(
                      'h-5 w-5',
                      activeSection === item.id
                        ? 'text-accent-neon'
                        : 'text-foreground'
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-medium">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {}
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
              className={cn(
                'desktop-nav-button-link flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-neon',
                'hover:bg-background-secondary'
              )}
              aria-label="Return to home page"
            >
              <HomeIcon className="h-5 w-5 text-foreground opacity-75 group-hover:opacity-100" />
            </Link>
            <div
              className="absolute right-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
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
              className={cn(
                'desktop-nav-button-link flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-neon',
                isFavoritesActive
                  ? 'bg-accent-neon/10'
                  : 'hover:bg-background-secondary'
              )}
              aria-label="Navigate to favorites"
              aria-current={isFavoritesActive ? 'page' : undefined}
            >
              <BookmarkIcon
                className={cn(
                  'h-5 w-5',
                  isFavoritesActive
                    ? 'text-accent-neon'
                    : 'text-foreground opacity-75 group-hover:opacity-100'
                )}
              />
            </Link>
            <div
              className="absolute right-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              role="tooltip"
            >
              <div className="dark:bg-black/90 bg-white/90 backdrop-blur-md px-3 py-2 rounded-md text-sm font-medium text-foreground flex items-center border border-border shadow-md">
                Favorites
              </div>
            </div>
          </li>

          <li className="w-full">
            <div
              className="h-px w-6 bg-border/50 mx-auto"
              aria-hidden="true"
            ></div>
          </li>

          {navItems.map((item, index) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'cursor-pointer desktop-nav-button w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-neon focus:ring-offset-2',
                  activeSection === item.id
                    ? 'bg-accent-neon shadow-[0_0_10px_rgba(0,255,127,0.8)]'
                    : 'bg-foreground opacity-75 group-hover:opacity-100 hover:scale-125'
                )}
                aria-label={`Navigate to ${item.title} section`}
                aria-current={
                  activeSection === item.id ? 'page' : undefined
                }
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
                      if (index < navItems.length - 1) {
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
                        `.desktop-nav-button:nth-of-type(${navItems.length})`
                      ) as HTMLElement;
                      lastButton?.focus();
                      break;
                  }
                }}
              />
              {}
              <div
                className="absolute right-14 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 whitespace-nowrap will-change-[opacity,transform]"
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
              onClick={toggleTheme}
              className="cursor-pointer desktop-nav-button-link flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-neon hover:bg-background-secondary"
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
              className="absolute right-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
              role="tooltip"
            >
              <div className="dark:bg-black/90 bg-white/90 backdrop-blur-md px-3 py-2 rounded-md text-sm font-medium text-foreground flex items-center border border-border shadow-md">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </div>
            </div>
          </li>
        </ul>
      </nav>
      {}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:block">
        <SearchInput onSubmit={handleSearchComplete} />
      </div>
    </>
  );
}
