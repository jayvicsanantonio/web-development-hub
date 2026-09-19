// Root layout: fonts, metadata, the providers every page needs, and the
// blocking script that settles the theme before the first paint.
import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Footer from '@/components/ui/footer';
import { BookmarksProvider } from '@/contexts/bookmarks-context';
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
    {
      media: '(prefers-color-scheme: dark)',
      color: 'hsl(222 47% 11%)',
    },
  ],
};

// The one place the theme is resolved: a stored choice wins, then the system
// preference. It has to run before the first paint, so it is inlined here
// rather than imported: the export is static, and applying the class from an
// effect meant every visitor whose theme differed from the default saw it
// flash. lib/theme.ts only ever flips what this settled.
const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark'){document.documentElement.classList.add('dark')}document.documentElement.style.colorScheme=t}catch(e){}`;
export const metadata: Metadata = {
  // Pages set their own title; this frames it and supplies the fallback.
  title: {
    default: 'Web Development Hub',
    template: '%s | Web Development Hub',
  },
  description:
    'A curated list of web development resources, tools, libraries and communities for web developers',
  metadataBase: new URL('https://webdevhub.link/'),
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
  // Point at the icons already shipped in public/ and referenced by the web
  // manifest. Until now no rel="icon" was emitted at all: the app carried a
  // /icon route that generated one at runtime, but nothing ever linked to it.
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icon-192x192.png',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The script below sets `class` and `style` here before React hydrates, so
    // this element's own attributes are expected to differ from the prerendered
    // HTML. The suppression is one level deep and does not reach the body.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
        />

        {/* Preconnect to external domains */}
        <link
          rel="preconnect"
          href="https://api.iconify.design"
          crossOrigin=""
        />
        <link rel="dns-prefetch" href="https://api.iconify.design" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground min-h-screen overflow-x-hidden`}
      >
        <BookmarksProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Footer />
        </BookmarksProvider>
      </body>
    </html>
  );
}
