import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Footer from '@/components/ui/footer';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { ThemeProvider } from '@/contexts/theme-context';
import LayoutWrapper from '@/components/ui/layout-wrapper';
import ServiceWorkerRegistration from '@/components/service-worker-registration';
import './globals.css';
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: 'hsl(222 47% 11%)',
};
export const metadata: Metadata = {
  title: 'Web Development Hub',
  description:
    'A curated list of web development resources, tools, libraries and communities for web developers',
  metadataBase: new URL('https://webdevhub.link'),
  keywords: [
    'web development',
    'developer tools',
    'frameworks',
    'libraries',
    'programming',
    'frontend',
    'backend',
    'javascript',
    'react',
    'resources',
  ],
  authors: [{ name: 'Web Development Hub' }],
  creator: 'Web Development Hub',
  publisher: 'Web Development Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Web Development Hub',
    description:
      'A curated list of web development resources, tools, libraries and communities',
    type: 'website',
    locale: 'en_US',
    siteName: 'Web Development Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Hub',
    description:
      'A curated list of web development resources, tools, libraries and communities',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link
          rel="preconnect"
          href="https://api.iconify.design"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://api.iconify.design" />

        {/* Resource hints */}
        <meta
          name="msapplication-TileColor"
          content="hsl(222 47% 11%)"
        />
        <meta name="theme-color" content="hsl(222 47% 11%)" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground min-h-screen overflow-x-hidden`}
      >
        <ServiceWorkerRegistration />
        <ThemeProvider>
          <FavoritesProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <Footer />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
