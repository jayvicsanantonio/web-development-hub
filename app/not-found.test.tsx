// Covers the 404 page: what it says, the way back it offers to the home page
// and every section page, and that it asks not to be indexed.
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound, { metadata } from './not-found';
import { SECTIONS } from '@/constants/sections';
import { sectionNumber } from '@/lib/utils/navigation';

describe('the 404 page', () => {
  it('says the page is not in the index', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('heading', { level: 1 })
    ).toHaveTextContent('Not in the index.');
    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });

  it('links back to the home page', () => {
    render(<NotFound />);

    expect(
      screen.getByRole('link', { name: 'Back to the home page' })
    ).toHaveAttribute('href', '/');
  });

  it('links every section page, named by its title alone', () => {
    render(<NotFound />);

    for (const section of SECTIONS) {
      expect(
        screen.getByRole('link', { name: section.title }),
        section.title
      ).toHaveAttribute('href', section.href);
    }
  });

  it('prints each section number beside its title', () => {
    render(<NotFound />);

    for (const section of SECTIONS) {
      expect(
        screen.getByRole('link', { name: section.title }),
        section.title
      ).toHaveTextContent(sectionNumber(section.title));
    }
  });
});

describe('metadata', () => {
  it('asks search engines not to index the page', () => {
    expect(metadata.robots).toEqual({ index: false });
  });
});
