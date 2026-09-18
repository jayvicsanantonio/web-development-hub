// Covers the mobile menu's closed state. The menu stays mounted and slides
// off-screen, so it has to be taken out of the tab order as well as hidden:
// otherwise keyboard users land on links they cannot see.
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import { MobileNavigation } from './mobile-navigation';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { ThemeProvider } from '@/contexts/theme-context';
import { DEFAULT_NAV_ITEMS } from '@/lib/utils/navigation';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <BookmarksProvider>
      <SearchProvider>{children}</SearchProvider>
    </BookmarksProvider>
  </ThemeProvider>
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
