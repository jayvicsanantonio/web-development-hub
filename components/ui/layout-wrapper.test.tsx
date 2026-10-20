// Covers the app shell's landmarks: the page in <main>, the footer after it
// rather than inside it, and the skip link that jumps past the chrome.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn() }),
}));

import LayoutWrapper from './layout-wrapper';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      disconnect() {}
    },
  );
  return () => vi.unstubAllGlobals();
});

const renderShell = () =>
  render(
    <LayoutWrapper footer={<footer>The footer</footer>}>
      <p>The page</p>
    </LayoutWrapper>,
    { wrapper },
  );

describe('the app shell', () => {
  it('renders the page inside main', () => {
    renderShell();
    expect(screen.getByRole('main')).toHaveTextContent('The page');
  });

  it('renders the footer after main rather than inside it', () => {
    renderShell();
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(main.contains(footer)).toBe(false);
    expect(
      main.compareDocumentPosition(footer) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('offers a skip link to the main content', () => {
    renderShell();
    expect(
      screen.getByRole('link', { name: 'Skip to main content' }),
    ).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('main')).toHaveAttribute(
      'id',
      'main-content',
    );
  });
});
