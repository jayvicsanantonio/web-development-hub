// Covers the landing page: the intro's contents, every section previewed with
// its own first resources, and a link through to that section's page.
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
import { ALL_RESOURCES, SECTIONS } from '@/constants/sections';
import { sectionNumber } from '@/lib/utils/navigation';

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

describe('the intro', () => {
  it('counts the whole index', () => {
    render(<Home />, { wrapper });

    expect(
      screen.getByText(
        new RegExp(
          `${ALL_RESOURCES.length} resources in ${SECTIONS.length} sections`
        )
      )
    ).toBeInTheDocument();
  });

  it('lists every section page with its count', () => {
    render(<Home />, { wrapper });
    const contents = screen.getByRole('navigation', { name: 'Contents' });

    for (const section of SECTIONS) {
      const link = within(contents).getByRole('link', {
        name: new RegExp(`^${section.title}`),
      });
      expect(link).toHaveAttribute('href', section.href);
      expect(link).toHaveTextContent(String(section.links.length));
    }
  });
});

describe('the section headings', () => {
  it('number each section by its place in the index', () => {
    render(<Home />, { wrapper });

    for (const section of SECTIONS) {
      const region = screen.getByRole('region', {
        name: section.title,
      });
      expect(region).toHaveTextContent(
        `No. ${sectionNumber(section.title)}`
      );
    }
  });

  it('count the resources each section holds', () => {
    render(<Home />, { wrapper });

    for (const section of SECTIONS) {
      const region = screen.getByRole('region', {
        name: section.title,
      });
      expect(region).toHaveTextContent(
        `${section.links.length} resources`
      );
    }
  });
});
