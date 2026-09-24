// Covers the landing page's preview of one section: its first resources, in
// the order the dataset lists them, looked up from the slug alone.
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  PREVIEW_COUNT,
  SectionPreviewGrid,
} from './section-preview-grid';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SECTIONS } from '@/constants/sections';

describe('the preview', () => {
  it('shows the first resources of the section named by the slug', () => {
    const section = SECTIONS[1];
    render(<SectionPreviewGrid slug={section.href.slice(1)} />, {
      wrapper: BookmarksProvider,
    });

    expect(
      screen
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(
      section.links.slice(0, PREVIEW_COUNT).map((link) => link.title),
    );
  });
});
