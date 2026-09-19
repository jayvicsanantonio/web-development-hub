// The sitemap: the home page, every section page and the legal pages. Section
// pages come from the dataset, so adding a section lists it here too.
import { MetadataRoute } from 'next';
import { SECTIONS } from '@/constants/sections';

// Required by `output: 'export'`: metadata routes must opt in to static
// generation explicitly, or the export build fails collecting page data.
export const dynamic = 'force-static';

// No trailing slash: every path below brings its own leading slash.
const BASE_URL = 'https://webdevhub.link';

// /bookmarks is left out on purpose: its content exists only in the visitor's
// own browser, and its metadata asks search engines not to index it.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    ...SECTIONS.map((section) => ({
      url: `${BASE_URL}${section.href}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...['/privacy-policy', '/terms-of-service'].map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
