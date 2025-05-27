// Server Component by default in App Router

import Link from 'next/link';
import { BookOpen, Zap, Users, Compass, ArrowRight } from 'lucide-react'; // Added ArrowRight for buttons

export default function Home() {
  return (
    <div className="flex flex-col"> {/* Main container for page sections */}
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 lg:py-40 bg-primary-container text-on-primary-container text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Unlock the World of Web Development
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-on-primary-container/90">
            Your central hub for the latest tools, resources, and communities to supercharge your journey from learner to pro.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/browse" // Assuming /browse is where resources are listed
              className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-3 text-on-secondary text-base font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary-container transition-all duration-150 ease-in-out group"
            >
              Explore Resources
              <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#discover" // Link to the "Discover What's Inside" section
              className="inline-flex items-center justify-center rounded-full border-2 border-secondary px-8 py-3 text-secondary text-base font-medium hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary-container transition-all duration-150 ease-in-out"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* "Discover What's Inside" Section */}
      <section id="discover" className="w-full py-16 md:py-24 lg:py-32 bg-surface text-on-surface">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16 text-on-surface">
            Discover What's Inside
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Curated Learning Paths */}
            <div className="flex flex-col items-center text-center p-6 bg-surface-variant rounded-xl shadow-md3-elevation-1 hover:shadow-md3-elevation-2 transition-shadow duration-300">
              <div className="p-3 rounded-full bg-primary/20 mb-4">
                <BookOpen size={32} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-on-surface-variant">Curated Learning Paths</h3>
              <p className="text-on-surface-variant/80 text-sm">
                Follow structured learning paths with handpicked courses, tutorials, and official documentation.
              </p>
            </div>
            
            {/* Card 2: Cutting-Edge Tools & Frameworks */}
            <div className="flex flex-col items-center text-center p-6 bg-surface-variant rounded-xl shadow-md3-elevation-1 hover:shadow-md3-elevation-2 transition-shadow duration-300">
              <div className="p-3 rounded-full bg-primary/20 mb-4">
                <Zap size={32} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-on-surface-variant">Tools & Frameworks</h3>
              <p className="text-on-surface-variant/80 text-sm">
                Master essential developer tools and explore popular frameworks to build modern web applications.
              </p>
            </div>

            {/* Card 3: Vibrant Communities */}
            <div className="flex flex-col items-center text-center p-6 bg-surface-variant rounded-xl shadow-md3-elevation-1 hover:shadow-md3-elevation-2 transition-shadow duration-300">
              <div className="p-3 rounded-full bg-primary/20 mb-4">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-on-surface-variant">Vibrant Communities</h3>
              <p className="text-on-surface-variant/80 text-sm">
                Connect with fellow developers, join discussions, and stay updated with insightful community blogs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resource Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-tertiary-container text-on-tertiary-container">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Spotlight: Interactive Coding Tutorials
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-on-tertiary-container/90">
            Dive into our latest hands-on tutorials and build real-world projects step-by-step. Enhance your skills with practical examples.
          </p>
          <div className="mt-10">
            <Link
              href="/tutorials/interactive" // Example link
              className="inline-flex items-center justify-center rounded-full bg-tertiary px-8 py-3 text-on-tertiary text-base font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 focus:ring-offset-tertiary-container transition-all duration-150 ease-in-out group"
            >
              Start Learning Now
              <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
