import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import TopAppBar from "@/components/layout/top-app-bar";
import ModalNavigationDrawer from "@/components/layout/modal-navigation-drawer";
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
      <body className={`${inter.variable} ${nunito.variable} font-sans flex flex-col min-h-screen bg-background text-on-background`}>
        <TopAppBar />
        <ModalNavigationDrawer /> {/* Actual visibility will be state-controlled later */}
        <main className="flex-1 w-full py-8 md:py-12 lg:py-16 px-4 md:px-6">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
