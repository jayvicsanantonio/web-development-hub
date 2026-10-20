// Covers the landing page: the size of the catalogue, every section previewed
// with its own first resources, and a link through to that section's page.
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
import {
  ALL_RESOURCES,
  ALL_TAGS,
  SECTIONS,
} from '@/constants/sections';

const wrapper = ({ children }: { children: ReactNode }) => (
  <BookmarksProvider>
    <SearchProvider>{children}</SearchProvider>
  </BookmarksProvider>
);

describe('the introduction', () => {
  it('states the size of the catalogue, counted from the dataset', () => {
    render(<Home />, { wrapper });

    const heading = screen.getByRole('heading', { level: 1 });
    const intro = heading.closest('header')!;
    expect(intro).toHaveTextContent(
      `${ALL_RESOURCES.length} resources`,
    );
    expect(intro).toHaveTextContent(`${SECTIONS.length} sections`);
    expect(intro).toHaveTextContent(`${ALL_TAGS.length} tags`);
  });

  it('lists every section as a tile', () => {
    render(<Home />, { wrapper });

    expect(
      within(
        screen.getByRole('list', { name: 'Sections' }),
      ).getAllByRole('listitem'),
    ).toHaveLength(SECTIONS.length);
  });
});

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
