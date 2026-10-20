// Covers the desktop top bar: the search box and filter toggle on every page
// that lists resources, and nothing on the policy pages, which list none.
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

const pathname = vi.hoisted(() => ({ current: '/' }));
vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

import { TopBar } from './top-bar';
import { SearchProvider } from '@/contexts/search-context';
import { SECTIONS } from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <SearchProvider>{children}</SearchProvider>
);

beforeEach(() => {
  pathname.current = '/';
});

describe('the top bar', () => {
  for (const path of ['/', SECTIONS[0].href, '/bookmarks']) {
    it(`carries the search box and filter toggle on ${path}`, () => {
      pathname.current = path;
      render(<TopBar />, { wrapper });

      expect(
        screen.getByRole('searchbox', { name: 'Search resources' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /^Filter resources/ }),
      ).toBeInTheDocument();
    });
  }

  for (const path of ['/privacy-policy', '/terms-of-service']) {
    it(`renders nothing on ${path}`, () => {
      pathname.current = path;
      const { container } = render(<TopBar />, { wrapper });

      expect(container).toBeEmptyDOMElement();
    });
  }
});
