'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SECTIONS } from '@/constants/sections';
import { Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearch } from '@/contexts/search-context';
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
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    clearSearch,
  } = useSearch();

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setLocalSearchQuery(value);

    setSearchQuery(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {

      setIsMobileMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    clearSearch();
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
      const sectionIds = Array.from(sections).map(section => section.id);
      

      if (isSearching) {

        const sectionsWithContent = Array.from(sections).filter(section => {

          const gridContainer = section.querySelector('.grid');
          return gridContainer && gridContainer.children.length > 0;
        });
        

        const sectionIdsWithContent = sectionsWithContent.map(section => section.id);
        
        const searchNavItems = sectionIdsWithContent
          .filter(id => id.startsWith('section-'))
          .map(id => {
            // Convert section ID back to display name
            const displayName = id
              .replace('section-', '')
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
              .replace('And', '&');
              
            // Find matching section icon if available
            const matchingSection = SECTIONS.find(section => 
              section.title.toLowerCase() === displayName.toLowerCase() ||
              section.title.toLowerCase().replace(' & ', ' and ') === displayName.toLowerCase()
            );
            
            return {
              id,
              title: displayName,
              icon: matchingSection?.icon || SECTIONS[0].icon, // Default to first icon if no match
            };
          });
          
        setNavItems(searchNavItems.length > 0 ? searchNavItems : []);
      } else {
        // Restore default nav items when not searching
        setNavItems([
          { id: 'section-learning-resources', title: 'Learning Resources', icon: SECTIONS[0].icon },
          { id: 'section-developer-tools', title: 'Developer Tools', icon: SECTIONS[1].icon },
          { id: 'section-frameworks-&-libraries', title: 'Frameworks & Libraries', icon: SECTIONS[2].icon },
          { id: 'section-communities', title: 'Communities', icon: SECTIONS[3].icon },
          { id: 'section-blogs', title: 'Blogs', icon: SECTIONS[4].icon },
        ]);
      }
    };
    
    // Update nav items initially and when search status changes
    updateNavItems();
    
  }, [isSearching, searchQuery]);
  const handleScroll = useCallback(() => {
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
            className="p-2 rounded-full bg-background-secondary hover:bg-background-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon"
            aria-expanded={isSearchOpen}
            aria-label="Search resources"
          >
            <Search
              className="h-5 w-5 text-foreground"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full bg-background-secondary hover:bg-background-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent-neon"
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
          <form onSubmit={handleSearchSubmit}>
            <label htmlFor="mobile-search-input" className="sr-only">
              Search resources
            </label>
            <div className="relative">
              <Input
                id="mobile-search-input"
                type="search"
                placeholder="Search resources..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                className="w-full pr-10 bg-background-secondary"
                aria-label="Search resources"
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setIsSearchOpen(false);
                  }
                }}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-accent-neon text-background"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
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
          <ul className="flex flex-col gap-4 list-none m-0 p-0">
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
        className="fixed right-10 top-1/2 transform -translate-y-1/2 z-30 hidden md:flex"
        role="navigation"
      >
        <span id="nav-description" className="sr-only">
          Use up and down arrow keys to navigate between sections
        </span>
        <ul className="list-none m-0 p-0 flex flex-col items-center gap-8">
          {navItems.map((item, index) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'desktop-nav-button w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-neon focus:ring-offset-2',
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
                className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 whitespace-nowrap will-change-[opacity,transform]"
                role="tooltip"
                aria-hidden={activeSection !== item.id}
              >
                <div className="bg-background-secondary px-3 py-2 rounded-md text-sm font-medium text-foreground flex items-center border border-border shadow-sm">
                  {item.title}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      {}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 hidden md:block">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground opacity-70" />
            <Input
              type="search"
              placeholder="Search resources..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              className="w-64 pl-9 pr-10 py-2 bg-background-secondary/80 backdrop-blur-md rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-background-secondary/90"
              aria-label="Search resources"
              autoComplete="off"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-accent-neon text-background"
              aria-label="Submit search"
            >
              <Search className="h-3 w-3" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
