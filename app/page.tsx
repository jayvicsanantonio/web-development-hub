import Link from "next/link";
import { SECTIONS } from "@/constants/sections";

export default function Home() {
  return (
    <div className="container grid items-center justify-center gap-4 text-center lg:gap-10">
      <div className="space-y-3">
        <h2 className="font-heading text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Elevate Your Web Development Journey
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Discover a wealth of resources, tools, and community support to
          enhance your web development skills and build exceptional digital
          experiences.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-card p-6 shadow-cute-md transition-transform duration-200 ease-out hover:transform hover:-translate-y-1 hover:scale-103"
          >
            <section.icon className="h-12 w-12 text-primary" />
            <h3 className="font-heading text-lg font-bold text-card-foreground">{section.title}</h3>
            <p className="text-sm text-muted-foreground">
              {section.description}
            </p>
            <Link
              href={section.href || "#"}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-cute-sm hover:bg-primary/90 hover:transform hover:-translate-y-0.5 hover:scale-105 active:transform active:translate-y-px active:scale-98 transition-transform duration-200 ease-out"
              prefetch={false}
            >
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
