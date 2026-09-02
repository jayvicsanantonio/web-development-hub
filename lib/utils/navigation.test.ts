import { describe, it, expect } from 'vitest';
import { SECTIONS } from '@/constants/sections';
import { DEFAULT_NAV_ITEMS, toSectionId, toSlug } from './navigation';

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
