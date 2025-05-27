// No "use client" needed if no client-side interactions like state are directly on this page.
// Link and basic JSX are server components by default in App Router.

import Link from 'next/link';
import { BookOpen, Compass, Users, Zap } from 'lucide-react'; // Example icons

export default function Home() {
  return (
    <div className="flex flex-col"> {/* Main container for page sections */}
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-primary-container text-on-primary-container text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Web Dev Hub: Your Portal to Modern Development
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-on-primary-container/90">
            Discover curated resources, cutting-edge tools, and vibrant communities to accelerate your web development journey.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/browse" // Link to the new page that will list all sections
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-on-primary text-sm font-medium shadow-md3-elevation-1 hover:shadow-md3-elevation-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-primary-container transition-all duration-150 ease-in-out"
            >
              Explore All Resources
            </Link>
            {/* Optional Secondary CTA */}
            <Link
              href="#value-prop"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-3 text-primary text-sm font-medium hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-primary-container transition-all duration-150 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="value-prop" className="w-full py-16 md:py-24 lg:py-32 bg-surface text-on-surface">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16">
            Why Web Dev Hub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value Prop Item 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-surface-variant rounded-xl shadow-md3-elevation-0">
              <BookOpen size={40} className="mb-4 text-secondary" />
              <h3 className="font-heading text-xl font-semibold mb-2 text-on-surface-variant">Curated Learning</h3>
              <p className="text-on-surface-variant/80 text-sm">
                Access top-tier courses, tutorials, and official documentation, all in one place.
              </p>
            </div>
            {/* Value Prop Item 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-surface-variant rounded-xl shadow-md3-elevation-0">
              <Zap size={40} className="mb-4 text-secondary" />
              <h3 className="font-heading text-xl font-semibold mb-2 text-on-surface-variant">Latest Tools</h3>
              <p className="text-on-surface-variant/80 text-sm">
                Discover essential developer tools, from IDEs and version control to bundlers and cloud platforms.
              </p>
            </div>
            {/* Value Prop Item 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-surface-variant rounded-xl shadow-md3-elevation-0">
              <Compass size={40} className="mb-4 text-secondary" />
              <h3 className="font-heading text-xl font-semibold mb-2 text-on-surface-variant">Framework Guides</h3>
              <p className="text-on-surface-variant/80 text-sm">
                Explore popular frameworks and libraries to build robust and scalable web applications.
              </p>
            </div>
            {/* Value Prop Item 4 */}
            <div className="flex flex-col items-center text-center p-6 bg-surface-variant rounded-xl shadow-md3-elevation-0">
              <Users size={40} className="mb-4 text-secondary" />
              <h3 className="font-heading text-xl font-semibold mb-2 text-on-surface-variant">Community & Blogs</h3>
              <p className="text-on-surface-variant/80 text-sm">
                Connect with communities and stay updated with insightful articles from industry experts.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* TODO: (Optional) Add Featured Content Section here if desired */}
    </div>
  );
}
