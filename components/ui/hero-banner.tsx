import React from "react";

interface HeroBannerProps {
  title: string;
  description: string;
  tagline?: string;
}

export function HeroBanner({
  title,
  description,
  tagline = "Web Development Hub",
}: HeroBannerProps) {
  return (
    <section className="container mx-auto py-12 md:py-24 flex flex-col items-center justify-center text-center space-y-6">
      {tagline && (
        <div className="inline-block rounded-full bg-accent-neon/10 px-4 py-1.5 text-sm font-medium text-accent-neon mb-4">
          {tagline}
        </div>
      )}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-foreground-muted max-w-[700px] mt-4">
        {description}
      </p>
    </section>
  );
}
