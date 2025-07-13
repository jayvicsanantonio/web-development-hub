'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
}

export default function LazyLoad({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  placeholder = <div className="animate-pulse bg-muted h-32 rounded-lg" />
}: LazyLoadProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? children : placeholder}
    </div>
  );
}
