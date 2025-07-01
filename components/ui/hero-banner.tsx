import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

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
  const thresholdRef = useRef<number>(0);
  const ticking = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const calculateThreshold = () => {
      if (heroRef.current) {
        thresholdRef.current = heroRef.current.offsetHeight / 3;
      }
    };

    calculateThreshold();

    window.addEventListener('resize', calculateThreshold);
    return () =>
      window.removeEventListener('resize', calculateThreshold);
  }, []);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const threshold = thresholdRef.current;

        if (scrollY > threshold && isVisibleRef.current) {
          setIsVisible(false);
        } else if (scrollY <= threshold && !isVisibleRef.current) {
          setIsVisible(true);
        }

        ticking.current = false;
      });

      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
