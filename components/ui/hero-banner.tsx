import React, { useEffect, useRef, useState } from 'react';

interface HeroBannerProps {
  title: string;
  description: string;
  tagline?: string;
}

export function HeroBanner({
  title,
  description,
  tagline = 'Web Development Hub',
}: HeroBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const threshold = heroHeight / 2;

      if (scrollY > threshold && isVisible) {
        setIsVisible(false);
      } else if (scrollY <= threshold && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <div
      ref={heroRef}
      className={`min-h-[100vh] w-full sticky top-0 z-10 transition-transform duration-500 ease-in-out ${
        !isVisible ? '-translate-y-full' : ''
      }`}
    >
      <section className="container mx-auto h-screen flex flex-col items-center justify-center text-center space-y-6 px-4">
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
        <div className="mt-8 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </section>
    </div>
  );
}
