// Covers the landing page: every section previewed with its own first
// resources, and a link through to that section's page.
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import Home from './page';
import { PREVIEW_COUNT } from '@/components/section-preview-grid';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';
import { SECTIONS } from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

describe('the section previews', () => {
  it('preview each section with its own first resources', () => {
    render(<Home />, { wrapper });

    for (const section of SECTIONS) {
      const region = screen.getByRole('region', {
        name: section.title,
      });
      expect(
        within(region)
          .getAllByRole('heading', { level: 3 })
          .map((heading) => heading.textContent),
        `${section.title} preview`,
      ).toEqual(
        section.links
          .slice(0, PREVIEW_COUNT)
          .map((link) => link.title),
      );
    }
  });

  it('link each preview through to its section page', () => {
    render(<Home />, { wrapper });

    for (const section of SECTIONS) {
      const region = screen.getByRole('region', {
        name: section.title,
      });
      expect(
        within(region).getByRole('link', {
          name: `View all ${section.title}`,
        }),
      ).toHaveAttribute('href', section.href);
    }
  });
});
