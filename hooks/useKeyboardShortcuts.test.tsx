// Covers the global shortcuts. The handlers used to be recreated on every
// render and read from a stale dependency list, and Ctrl+F logged to the
// console on every press.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';

const router = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => router,
}));

import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider, useSearch } from '@/contexts/search-context';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

function Harness() {
  useKeyboardShortcuts();
  const { searchQuery, setSearchQuery, isFilterPanelOpen } =
    useSearch();
  return (
    <div>
      <input
        type="search"
        aria-label="Search resources"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span data-testid="query">{searchQuery}</span>
      <span data-testid="panel">{String(isFilterPanelOpen)}</span>
    </div>
  );
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

const mount = () => render(<Harness />, { wrapper });
const searchBox = () => screen.getByLabelText('Search resources');

beforeEach(() => {
  router.push.mockClear();
});

describe('focus shortcuts', () => {
  it('focuses the search box on Ctrl+K', async () => {
    const user = userEvent.setup();
    mount();
    await user.keyboard('{Control>}k{/Control}');
    expect(searchBox()).toHaveFocus();
  });

  it('focuses the search box on / when nothing is focused', async () => {
    const user = userEvent.setup();
    mount();
    await user.keyboard('/');
    expect(searchBox()).toHaveFocus();
  });

  it('leaves / alone while typing in a field', async () => {
    const user = userEvent.setup();
    mount();
    searchBox().focus();
    await user.keyboard('a/b');
    expect(searchBox()).toHaveValue('a/b');
  });
});

describe('navigation shortcuts', () => {
  it('routes to bookmarks on Ctrl+B', async () => {
    const user = userEvent.setup();
    mount();
    await user.keyboard('{Control>}b{/Control}');
    expect(router.push).toHaveBeenCalledWith('/bookmarks');
  });

  it('routes home on Ctrl+H', async () => {
    const user = userEvent.setup();
    mount();
    await user.keyboard('{Control>}h{/Control}');
    expect(router.push).toHaveBeenCalledWith('/');
  });
});

describe('filter panel', () => {
  it('toggles on Ctrl+F without logging', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const user = userEvent.setup();
    mount();

    expect(screen.getByTestId('panel')).toHaveTextContent('false');
    await user.keyboard('{Control>}f{/Control}');
    expect(screen.getByTestId('panel')).toHaveTextContent('true');

    expect(log).not.toHaveBeenCalled();
  });
});

describe('theme shortcut', () => {
  it('toggles the theme on Ctrl+Shift+L', async () => {
    const user = userEvent.setup();
    const before =
      document.documentElement.classList.contains('dark');
    mount();

    await user.keyboard('{Control>}{Shift>}L{/Shift}{/Control}');

    expect(
      document.documentElement.classList.contains('dark')
    ).toBe(!before);
  });
});

describe('escape', () => {
  it('clears a query typed into the focused search box', async () => {
    const user = userEvent.setup();
    mount();

    await user.click(searchBox());
    await user.keyboard('react');
    expect(screen.getByTestId('query')).toHaveTextContent('react');

    await user.keyboard('{Escape}');
    expect(screen.getByTestId('query')).toBeEmptyDOMElement();
  });
});
