// Covers the one route every section page is generated from: which pages it
// emits, what each one declares about itself, and what it refuses.
import { describe, it, expect } from 'vitest';
import Page, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from './page';
import { SECTIONS } from '@/constants/sections';

const params = (section: string) => ({
  params: Promise.resolve({ section }),
});

describe('the pages it generates', () => {
  it('emits one page per section, at the section href', () => {
    expect(
      generateStaticParams().map(({ section }) => `/${section}`)
    ).toEqual(SECTIONS.map((s) => s.href));
  });

  it('generates nothing beyond those, so any other path is the 404 page', () => {
    expect(dynamicParams).toBe(false);
  });
});

describe('metadata', () => {
  it('takes each page title and description from its section', async () => {
    for (const section of SECTIONS) {
      const metadata = await generateMetadata(
        params(section.href.slice(1))
      );

      expect(metadata.title).toBe(section.title);
      expect(metadata.description).toBe(section.description);
      expect(metadata.alternates?.canonical).toBe(section.href);
    }
  });

  it('throws for a slug no section has, failing the build', async () => {
    await expect(
      generateMetadata(params('no-such-section'))
    ).rejects.toThrow(/No section at/);
  });
});

describe('the client boundary', () => {
  it('hands the client component only the slug, not the section', async () => {
    // Props crossing into a client component are serialised into the page's
    // payload. The client bundle already carries the dataset, so passing the
    // section shipped every one of its resources a second time.
    const element = await Page(params('developer-tools'));
    expect(element.props).toEqual({ slug: 'developer-tools' });
  });
});
