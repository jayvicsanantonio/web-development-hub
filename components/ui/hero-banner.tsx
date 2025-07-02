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
  return (
    <div className="min-h-[100vh] w-full">
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
        <div className="mt-8">
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
