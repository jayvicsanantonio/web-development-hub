import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/ui/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web Development Hub: Your Ultimate Guide to Resources, Tools, and Communities",
  description: "Explore a comprehensive collection of web development resources, including tutorials, tools, frameworks, libraries, communities, and blogs. Elevate your skills and build amazing web experiences.",
  keywords: ["web development", "developer resources", "coding tools", "programming tutorials", "frontend frameworks", "backend libraries", "developer communities", "tech blogs"],
  openGraph: {
    title: "Web Development Hub: Your Ultimate Guide to Resources, Tools, and Communities",
    description: "Explore a comprehensive collection of web development resources, including tutorials, tools, frameworks, libraries, communities, and blogs. Elevate your skills and build amazing web experiences.",
    url: "https://webdevhub.link/",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Hub: Your Ultimate Guide to Resources, Tools, and Communities",
    description: "Explore a comprehensive collection of web development resources, including tutorials, tools, frameworks, libraries, communities, and blogs. Elevate your skills and build amazing web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex xl:flex-row flex-col relative`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:border-ring focus:rounded-md"
        >
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex-1">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
