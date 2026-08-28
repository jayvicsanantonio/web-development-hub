import { MetadataRoute } from 'next';

// Required by `output: 'export'`: metadata routes must opt in to static
// generation explicitly, or the export build fails collecting page data.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://webdevhub.link/sitemap.xml',
  };
}
