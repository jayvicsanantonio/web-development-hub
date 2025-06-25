import React from 'react';
import Link from "next/link";
import dynamic from "next/dynamic";
const ResourceSection = dynamic(() => import('./sections').then(mod => ({ default: mod.ResourceSection })), {
  loading: () => (
    <div className="container mx-auto py-12 space-y-8 animate-pulse">
      <div className="flex flex-col space-y-2">
        <div className="h-8 bg-background-muted rounded w-64"></div>
        <div className="h-6 bg-background-muted rounded w-96"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-full bg-background-muted"></div>
            <div className="space-y-2">
              <div className="h-6 bg-background-muted rounded w-3/4"></div>
              <div className="h-4 bg-background-muted rounded w-full"></div>
              <div className="h-4 bg-background-muted rounded w-2/3"></div>
            </div>
            <div className="h-4 bg-background-muted rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: true
});
export default function Home() {
  return (
    <div className="flex flex-col w-full space-y-24 px-4 md:px-6">
      {}
      <section className="container mx-auto py-12 md:py-24 flex flex-col items-center justify-center text-center space-y-6">
        <div className="inline-block rounded-full bg-accent-neon/10 px-4 py-1.5 text-sm font-medium text-accent-neon mb-4">
          Web Development Hub
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">
          Elevate Your Web Development Journey
        </h1>
        <p className="text-lg md:text-xl text-foreground-muted max-w-[700px] mt-4">
          Discover a wealth of resources, tools, and community support to
          enhance your web development skills and build exceptional digital
          experiences.
        </p>
      </section>
      {}
      <ResourceSection 
        title="Learning Resources" 
        description="Start or advance your web development journey with these educational resources" 
        category="learning" 
        ctaText="Explore Resource" 
        viewAllLink="/learning-resources" 
        viewAllText="View All Resources" 
        accentColor="neon"
      />
      {}
      <ResourceSection 
        title="Developer Tools" 
        description="Essential tools to streamline your development workflow" 
        category="tools" 
        ctaText="View Tool" 
        viewAllLink="/developer-tools" 
        viewAllText="View All Tools" 
        accentColor="purple"
      />
      {}
      <ResourceSection 
        title="Frameworks & Libraries" 
        description="Popular frameworks and libraries to build modern web applications" 
        category="frameworks" 
        ctaText="Learn More" 
        viewAllLink="/frameworks-and-libraries" 
        viewAllText="View All Frameworks" 
        accentColor="neon"
      />
      {}
      <ResourceSection 
        title="Communities" 
        description="Connect with fellow developers in these vibrant communities" 
        category="communities" 
        ctaText="Join Community" 
        viewAllLink="/communities" 
        viewAllText="View All Communities" 
        accentColor="purple"
      />
      {}
      <ResourceSection 
        title="Blogs" 
        description="Stay updated with the latest trends and insights from the web development world" 
        category="blogs" 
        ctaText="Read Blog" 
        viewAllLink="/blogs" 
        viewAllText="View All Blogs" 
        accentColor="neon"
      />
      {}
      <footer className="container mx-auto py-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-muted">
            © {new Date().getFullYear()} Web Development Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-sm text-foreground-muted hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
