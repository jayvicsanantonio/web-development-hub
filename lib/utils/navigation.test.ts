// Covers the section ids and nav items: every id the nav points at must be one
// a page renders, listed in the dataset's order.
import { describe, it, expect } from 'vitest';
import { SECTIONS } from '@/constants/sections';
import {
  DEFAULT_NAV_ITEMS,
  sectionNavItems,
  toSectionId,
  toSlug,
} from './navigation';

describe('section ids', () => {
  it('slugs titles the way the pages render them', () => {
    expect(toSlug('Blogs and Newsletters')).toBe(
      'blogs-and-newsletters'
    );
    expect(toSectionId('Blogs and Newsletters')).toBe(
      'section-blogs-and-newsletters'
    );
    expect(toSectionId('Frameworks and Libraries')).toBe(
      'section-frameworks-and-libraries'
    );
    // Titles joined with an ampersand collapse to a single separator rather
    // than leaving a stray '-&-'.
    expect(toSectionId('Tools & Utilities')).toBe(
      'section-tools-utilities'
    );
  });

  it('points every nav item at an id derived from a real section', () => {
    // navigation.ts used to hand-list these and declared 'section-blogs' while
    // the renderers emit 'section-blogs-and-newsletters', so that nav entry
    // could neither scroll nor highlight: it referenced an element that is
    // never on the page.
    const expected = SECTIONS.map((s) => toSectionId(s.title));
    expect(DEFAULT_NAV_ITEMS.map((i) => i.id)).toEqual(expected);
  });

  it('covers every section exactly once', () => {
    expect(DEFAULT_NAV_ITEMS).toHaveLength(SECTIONS.length);
    const ids = DEFAULT_NAV_ITEMS.map((i) => i.id);
    expect(ids).toHaveLength(new Set(ids).size);
  });

  it('keeps nav titles identical to the section titles they link to', () => {
    expect(DEFAULT_NAV_ITEMS.map((i) => i.title)).toEqual(
      SECTIONS.map((s) => s.title)
    );
  });
});

describe('nav items for a result set', () => {
  // These used to be read back out of the DOM: the rendered section ids were
  // parsed into words and title-cased again, with a hard-coded exception for
  // 'Frameworks and Libraries' and a `.grid` selector standing in for "has
  // results". The results themselves say all of it.
  const resultIn = (sectionTitle: string) => ({
    title: 'Anything',
    href: `https://example.com/${sectionTitle}`,
    description: 'A resource.',
    section: sectionTitle,
  });

  it('lists only the sections present in the results', () => {
    const items = sectionNavItems([
      resultIn('Communities'),
      resultIn('Developer Tools'),
    ]);

    expect(items.map((i) => i.title)).toEqual([
      'Developer Tools',
      'Communities',
    ]);
  });

  it('keeps the canonical section order, not the result order', () => {
    const items = sectionNavItems([
      resultIn('Blogs and Newsletters'),
      resultIn('Learning Resources'),
    ]);

    expect(items.map((i) => i.title)).toEqual([
      'Learning Resources',
      'Blogs and Newsletters',
    ]);
  });

  it('deduplicates sections with several results', () => {
    const items = sectionNavItems([
      resultIn('Communities'),
      resultIn('Communities'),
      resultIn('Communities'),
    ]);

    expect(items).toHaveLength(1);
  });

  it('points each item at the id the page actually renders', () => {
    const [item] = sectionNavItems([
      resultIn('Frameworks and Libraries'),
    ]);

    expect(item.id).toBe('section-frameworks-and-libraries');
    expect(item.title).toBe('Frameworks and Libraries');
  });

  it('returns nothing for no results', () => {
    expect(sectionNavItems([])).toEqual([]);
  });

  it('ignores a section title that is not in the dataset', () => {
    expect(sectionNavItems([resultIn('Other')])).toEqual([]);
  });
});
