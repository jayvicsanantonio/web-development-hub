import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import VerticalNavigation from '@/components/ui/vertical-navigation';
import { SearchProvider } from '@/contexts/search-context';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { ThemeProvider } from '@/contexts/theme-context';
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
  themeColor: '#111827',
};
export const metadata: Metadata = {
  title: 'Web Development Hub',
  description:
    'A curated list of web development resources, tools, libraries and communities for web developers',
  metadataBase: new URL('https://web-development-hub.vercel.app'),
  openGraph: {
    title: 'Web Development Hub',
    description:
      'A curated list of web development resources, tools, libraries and communities',
    type: 'website',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider>
          <SearchProvider>
            <FavoritesProvider>
            <div className="flex h-full min-h-screen">
              <VerticalNavigation />
              <div className="relative flex flex-col flex-1">
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:p-2 focus:bg-accent focus:text-accent-foreground focus:z-50"
                >
                  Skip to main content
                </a>
                <main id="main-content" className="flex-1">
                  {children}
                </main>
              </div>
            </div>
            <Analytics />
            </FavoritesProvider>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
