import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Footer from '@/components/ui/footer';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { ThemeProvider } from '@/contexts/theme-context';
import LayoutWrapper from '@/components/ui/layout-wrapper';
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
          <FavoritesProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <Footer />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
