import { describe, it, expect } from 'vitest';
import {
  SECTIONS,
  SECTION_TITLES,
  sectionByTitle,
} from './sections';
import { getResourceIcon } from '@/lib/data/resource-mappings';

const allResources = SECTIONS.flatMap((section) =>
  section.links.map((link) => ({ ...link, section: section.title }))
);

describe('resource dataset integrity', () => {
  it('has no duplicate hrefs', () => {
    // A resource's href is both its React list key and its bookmark identity,
    // so a duplicate collides in reconciliation and in localStorage. Shipped
    // once, as two entries for https://ai-sdk.dev/.
    const seen = new Map<string, string[]>();
    for (const r of allResources) {
      seen.set(r.href, [...(seen.get(r.href) ?? []), r.title]);
    }
    const duplicates = [...seen.entries()].filter(
      ([, titles]) => titles.length > 1
    );
    expect(duplicates).toEqual([]);
  });

  it('gives every resource a non-placeholder icon', () => {
    const withoutIcon = allResources
      .filter((r) => getResourceIcon(r.title) === 'material-symbols:list')
      .map((r) => r.title);
    expect(withoutIcon).toEqual([]);
  });

  it('has no duplicate titles', () => {
    // Titles are the lookup key into RESOURCE_SECTIONS and ICON_MAP, so two
    // resources sharing one cannot be told apart by either.
    const titles = allResources.map((r) => r.title);
    expect(titles).toHaveLength(new Set(titles).size);
  });

  it('gives every resource the fields the UI reads', () => {
    for (const r of allResources) {
      expect(r.title, `${r.section} entry missing title`).toBeTruthy();
      expect(r.description, `${r.title} missing description`).toBeTruthy();
      expect(r.href, `${r.title} missing href`).toMatch(/^https?:\/\//);
    }
  });
});

describe('section lookup', () => {
  it('lists every section title in order', () => {
    expect(SECTION_TITLES).toEqual(SECTIONS.map((s) => s.title));
  });

  it('returns the section a title names', () => {
    expect(sectionByTitle('Communities').href).toBe('/communities');
  });

  it('throws rather than returning undefined for an unknown title', () => {
    // Pages call this at module scope, so an unknown title should fail the
    // build instead of prerendering an empty grid.
    expect(() => sectionByTitle('Nope')).toThrow(/No section titled/);
  });

  it('gives every section a tagline the pages can render', () => {
    // Both the homepage preview and the section's own page read this, so an
    // empty one leaves two places blank.
    for (const section of SECTIONS) {
      expect(
        section.description,
        `${section.title} description`
      ).toBeTruthy();
      expect(section.href).toMatch(/^\//);
    }
  });
});
