// Covers the desktop header: the way home, the bookmarks link and its count,
// the theme switch, and the search controls it leaves off the legal pages.
import { describe, it, expect, onTestFinished } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { DesktopHeader } from './desktop-header';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { STORAGE_KEY } from '@/lib/bookmarks-store';
import { SECTIONS } from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

function renderHeader(
  props: Partial<React.ComponentProps<typeof DesktopHeader>> = {},
) {
  return render(
    <DesktopHeader
      isHomeActive
      isBookmarksActive={false}
      hideSearch={false}
      {...props}
    />,
    { wrapper },
  );
}

const homeLink = () =>
  screen.getByRole('link', { name: /^Return to home page/ });

const bookmarksLink = () =>
  screen.getByRole('link', { name: /^Navigate to bookmarks/ });

describe('the way home', () => {
  it('links the home page and marks it current there', () => {
    renderHeader();
    expect(homeLink()).toHaveAttribute('href', '/');
    expect(homeLink()).toHaveAttribute('aria-current', 'page');
  });

  it('leaves the home link unmarked on other pages', () => {
    renderHeader({ isHomeActive: false });
    expect(homeLink()).not.toHaveAttribute('aria-current');
  });
});

describe('the bookmarks link', () => {
  it('links the bookmarks page and marks it current there', () => {
    renderHeader({ isHomeActive: false, isBookmarksActive: true });
    expect(bookmarksLink()).toHaveAttribute('href', '/bookmarks');
    expect(bookmarksLink()).toHaveAttribute('aria-current', 'page');
  });

  it('shows how many resources are saved', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        SECTIONS[0].links[0].id,
        SECTIONS[1].links[0].id,
      ]),
    );
    renderHeader();

    expect(bookmarksLink()).toHaveTextContent('2');
    expect(bookmarksLink()).toHaveAccessibleName(/2 saved/);
  });

  it('shows no count while nothing is saved', () => {
    renderHeader();
    expect(bookmarksLink()).not.toHaveTextContent(/\d/);
  });
});

describe('the theme switch', () => {
  it('flips the page between light and dark', async () => {
    const user = userEvent.setup();
    const root = document.documentElement;
    onTestFinished(() => {
      root.classList.remove('dark');
      root.style.colorScheme = '';
    });
    renderHeader();

    const toggle = screen.getByRole('button', {
      name: /^Switch between light and dark mode/,
    });
    await user.click(toggle);
    expect(root).toHaveClass('dark');

    await user.click(toggle);
    expect(root).not.toHaveClass('dark');
  });
});

describe('the search controls', () => {
  it('carries the search box and the filter button', () => {
    renderHeader();
    expect(
      screen.getByRole('searchbox', { name: 'Search resources' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^Filter resources/ }),
    ).toBeInTheDocument();
  });

  it('leaves them out where search is hidden', () => {
    renderHeader({ hideSearch: true });
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /^Filter resources/ }),
    ).not.toBeInTheDocument();
    // The rest of the header stays.
    expect(homeLink()).toBeInTheDocument();
  });
});
