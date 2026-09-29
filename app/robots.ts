// robots.txt, written at build time: every path may be crawled, and crawlers
// are pointed at the sitemap.
import { MetadataRoute } from 'next';

// Required by `output: 'export'`: metadata routes must opt in to static
// generation explicitly, or the export build fails collecting page data.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://webdevhub.link/sitemap.xml',
  };
}
