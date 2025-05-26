import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "@/components/ui/navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // CSS variable for Inter
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito", // CSS variable for Nunito
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Web Development Hub",
  description: "A curated list of web development resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable} font-sans flex xl:flex-row flex-col relative`}>
        <Navigation />
        <main className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex-1">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
