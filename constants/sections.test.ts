import { describe, it, expect } from 'vitest';
import {
  SECTIONS,
  SECTION_TITLES,
  sectionBySlug,
} from './sections';

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

  it('gives every resource and section an Iconify icon name', () => {
    // Iconify renders an empty box for a name it cannot resolve, so a typo
    // here fails quietly on the page rather than loudly in the build.
    const ICON_NAME = /^[a-z0-9-]+:[a-z0-9-]+$/;
    const invalid = [...SECTIONS, ...allResources]
      .filter((entry) => !ICON_NAME.test(entry.icon ?? ''))
      .map((entry) => `${entry.title}: ${entry.icon}`);
    expect(invalid).toEqual([]);
  });

  it('has no duplicate titles', () => {
    // A card's DOM id is its slugged title, so two resources sharing one would
    // render two elements with the same id on any page listing both.
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

  it('returns the section served at a slug', () => {
    expect(sectionBySlug('communities').title).toBe('Communities');
  });

  it('throws rather than returning undefined for an unknown slug', () => {
    // The section route calls this while generating each page, so an unknown
    // slug should fail the build instead of prerendering an empty grid.
    expect(() => sectionBySlug('nope')).toThrow(/No section at/);
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
