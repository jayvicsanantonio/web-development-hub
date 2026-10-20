// Covers the landing page's grid of section tiles: one per section, each
// linking to that section's page and saying how many resources it holds.
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { SectionTiles } from './section-tiles';
import { SECTIONS } from '@/constants/sections';

const tiles = () =>
  within(screen.getByRole('list', { name: 'Sections' })).getAllByRole(
    'listitem',
  );

describe('the section tiles', () => {
  it('give every section a tile, in the order the site lists them', () => {
    render(<SectionTiles />);

    expect(
      tiles().map(
        (tile) => within(tile).getByRole('heading').textContent,
      ),
    ).toEqual(SECTIONS.map((section) => section.title));
  });

  it('link each tile to its section page', () => {
    render(<SectionTiles />);

    for (const section of SECTIONS) {
      expect(
        screen.getByRole('link', { name: section.title }),
      ).toHaveAttribute('href', section.href);
    }
  });

  it('say how many resources each section holds', () => {
    render(<SectionTiles />);

    tiles().forEach((tile, index) => {
      expect(tile).toHaveTextContent(
        `${SECTIONS[index].links.length} resources`,
      );
    });
  });

  it('show the first resources of each section by name', () => {
    render(<SectionTiles />);

    tiles().forEach((tile, index) => {
      expect(tile).toHaveTextContent(SECTIONS[index].links[0].title);
    });
  });
});
