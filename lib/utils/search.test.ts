import { describe, it, expect } from 'vitest';
import {
  filterResources,
  isFiltering,
  resultSummary,
} from './search';

const resources = [
  {
    title: 'MDN Web Docs',
    description: 'Reference documentation for the web platform.',
    section: 'Learning Resources',
    tags: ['free', 'documentation'],
  },
  {
    title: 'Figma',
    description: 'Collaborative interface design.',
    section: 'Developer Tools',
    tags: ['design', 'free'],
  },
  {
    title: 'Untagged',
    description: 'Nothing to filter on.',
    section: 'Developer Tools',
  },
];

describe('isFiltering', () => {
  it('is false for an empty query and no tags', () => {
    expect(isFiltering('', [])).toBe(false);
    expect(isFiltering('   ', [])).toBe(false);
  });

  it('is true for a query or a tag on its own', () => {
    expect(isFiltering('mdn', [])).toBe(true);
    expect(isFiltering('', ['free'])).toBe(true);
  });
});

describe('filterResources', () => {
  it('returns the list untouched when nothing is being filtered on', () => {
    expect(filterResources(resources, '', [])).toEqual(resources);
  });

  it('matches on title, description and section', () => {
    expect(
      filterResources(resources, 'mdn', []).map((r) => r.title)
    ).toEqual(['MDN Web Docs']);
    expect(
      filterResources(resources, 'collaborative', []).map(
        (r) => r.title
      )
    ).toEqual(['Figma']);
    expect(
      filterResources(resources, 'developer tools', []).map(
        (r) => r.title
      )
    ).toEqual(['Figma', 'Untagged']);
  });

  it('ignores case and surrounding whitespace', () => {
    expect(
      filterResources(resources, '  FIGMA ', []).map((r) => r.title)
    ).toEqual(['Figma']);
  });

  it('keeps only resources carrying every selected tag', () => {
    expect(
      filterResources(resources, '', ['free']).map((r) => r.title)
    ).toEqual(['MDN Web Docs', 'Figma']);
    expect(
      filterResources(resources, '', ['free', 'design']).map(
        (r) => r.title
      )
    ).toEqual(['Figma']);
  });

  it('drops untagged resources as soon as a tag is selected', () => {
    expect(
      filterResources(resources, '', ['free']).map((r) => r.title)
    ).not.toContain('Untagged');
  });

  it('applies the query and the tags together', () => {
    expect(
      filterResources(resources, 'design', ['free']).map(
        (r) => r.title
      )
    ).toEqual(['Figma']);
  });

  it('works on a list whose entries carry no section', () => {
    // A category page filters its own section's links, which are stored
    // without a section of their own.
    const links = resources.map((r) => ({
      title: r.title,
      description: r.description,
      tags: r.tags,
    }));
    expect(
      filterResources(links, 'figma', []).map((r) => r.title)
    ).toEqual(['Figma']);
  });
});

describe('resultSummary', () => {
  it('names the query when there is one', () => {
    expect(resultSummary(3, 'react')).toBe(
      'Found 3 results for "react"'
    );
    expect(resultSummary(0, 'react')).toBe(
      'No results found for "react"'
    );
  });

  it('omits the empty quotes when only tags are selected', () => {
    // Filtering by tag alone used to report: Found 437 results for ""
    expect(resultSummary(3, '')).toBe('Found 3 results');
    expect(resultSummary(0, '')).toBe('No results found');
  });

  it('counts one result in the singular', () => {
    expect(resultSummary(1, 'react')).toBe(
      'Found 1 result for "react"'
    );
  });

  it('takes the noun the page counts in', () => {
    expect(resultSummary(2, '', 'bookmark')).toBe(
      'Found 2 bookmarks'
    );
    expect(resultSummary(1, 'mdn', 'bookmark')).toBe(
      'Found 1 bookmark for "mdn"'
    );
    expect(resultSummary(0, '', 'bookmark')).toBe(
      'No bookmarks found'
    );
  });
});
