import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Web Development Hub',
    short_name: 'WebDevHub',
    description: 'A curated list of web development resources, tools, libraries and communities for web developers',
    start_url: '/',
    display: 'standalone',
    background_color: 'hsl(222 47% 11%)',
    theme_color: 'hsl(222 47% 11%)',
    orientation: 'portrait',
    categories: ['productivity', 'development', 'education'],
    lang: 'en',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  };
}
