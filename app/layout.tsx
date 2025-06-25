import React from 'react';
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import VerticalNavigation from "@/components/ui/vertical-navigation";
import QueryProvider from "@/lib/providers/query-provider";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111827",
};
export const metadata: Metadata = {
  title: "Web Development Hub",
  description: "A curated list of web development resources, tools, libraries and communities for web developers",
  metadataBase: new URL("https://web-development-hub.vercel.app"),
  openGraph: {
    title: "Web Development Hub",
    description: "A curated list of web development resources, tools, libraries and communities",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground`}>
        <QueryProvider>
          {}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:p-4 focus:border focus:border-accent-neon focus:rounded-md"
          >
            Skip to main content
          </a>
          <VerticalNavigation />
          <main id="main-content" className="w-full min-h-screen pt-16 md:pt-24" tabIndex={-1}>
            {children}
            <Analytics />
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
