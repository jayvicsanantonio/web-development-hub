// Covers the mobile menu's closed state. The menu stays mounted and slides
// off-screen, so it has to be taken out of the tab order as well as hidden:
// otherwise keyboard users land on links they cannot see.
import { describe, it, expect, vi, onTestFinished } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

const pathname = vi.hoisted(() => ({ current: '/' }));
vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

import { MobileNavigation } from './mobile-navigation';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { DEFAULT_NAV_ITEMS } from '@/lib/utils/navigation';
import { SECTIONS } from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

const renderNav = () =>
  render(
    <MobileNavigation
      navItems={DEFAULT_NAV_ITEMS}
      activeSection=""
      onScrollToSection={vi.fn()}
    />,
    { wrapper }
  );

const menu = () => document.getElementById('mobile-menu')!;

const menuLink = (name: string) =>
  within(menu()).getByRole('link', { name, hidden: true });

describe('the closed menu', () => {
  it('is inert, so its links are not focusable', () => {
    renderNav();
    expect(menu()).toHaveAttribute('inert');
  });

  it('drops the inert attribute once it is opened', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(
      screen.getByRole('button', { name: 'Main menu' })
    );

    expect(menu()).not.toHaveAttribute('inert');
  });
});

describe('the menu links', () => {
  it('links home and to every section page', () => {
    renderNav();

    expect(menuLink('Home')).toHaveAttribute('href', '/');
    for (const section of SECTIONS) {
      expect(menuLink(section.title)).toHaveAttribute(
        'href',
        section.href
      );
    }
  });

  it('draws each entry with its icon', () => {
    renderNav();

    for (const title of ['Home', ...SECTIONS.map((s) => s.title)]) {
      expect(
        menuLink(title).querySelector('svg'),
        `${title} has no icon`
      ).toBeInTheDocument();
    }
  });

  it('marks the page being viewed as the current one', () => {
    pathname.current = SECTIONS[1].href;
    renderNav();

    expect(menuLink(SECTIONS[1].title)).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(menuLink('Home')).not.toHaveAttribute('aria-current');
    pathname.current = '/';
  });

  it('closes the menu when an entry is followed', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(
      screen.getByRole('button', { name: 'Main menu' })
    );
    expect(menu()).not.toHaveAttribute('inert');

    // next/link only cancels the click's default when it has a router
    // to hand the navigation to. There is none here, so jsdom would try
    // to load the page itself and report that it cannot. Cancelling it
    // in the capture phase still lets the link's onClick close the menu.
    const holdNavigation = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest('a')) {
        e.preventDefault();
      }
    };
    document.addEventListener('click', holdNavigation, true);
    onTestFinished(() =>
      document.removeEventListener('click', holdNavigation, true)
    );

    await user.click(menuLink(SECTIONS[0].title));
    expect(menu()).toHaveAttribute('inert');
  });
});
