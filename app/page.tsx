import Link from "next/link";
import { SECTIONS } from "@/constants/sections";

export default function Home() {
  return (
    <div className="container grid items-center justify-center gap-4 text-center lg:gap-10">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
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
            className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-6 shadow-xs transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950 dark:hover:bg-gray-800"
          >
            <section.icon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
            <h3 className="text-lg font-bold">{section.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {section.description}
            </p>
            <Link
              href={section.href || "#"}
              className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
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
