"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/constants/sections";
import { MountainIcon } from "lucide-react"; // Assuming MountainIcon is available or defined elsewhere

export function NavigationRail() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-40 flex h-full w-20 flex-col items-center overflow-y-auto bg-surface py-4 shadow-md3-elevation-1 dark:bg-neutral-800">
      {/* Logo Area */}
      <div className="mb-6 flex flex-col items-center text-center">
        <Link href="/" className="flex flex-col items-center text-primary"> {/* Removed dark:text-blue-400 */}
          <MountainIcon className="h-8 w-8" />
          {/* <span className="mt-1 text-xs font-medium text-on-surface dark:text-neutral-300">Web Dev Hub</span> */} {/* Text removed */}
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col items-center space-y-2">
        {SECTIONS.map((section) => {
          const isActive = pathname === section.href || pathname.startsWith(`${section.href}/`);
          const IconComponent = section.icon;

          return (
            <Link
              key={section.title}
              href={section.href}
              className={`
                flex w-[72px] h-[64px] flex-col items-center justify-center rounded-lg p-2
                transition-colors duration-150 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  isActive
                    ? "bg-primary-container text-on-primary-container focus:ring-primary" // Changed to primary
                    : "text-on-surface-variant hover:bg-black/5 dark:hover:bg-white/5 focus:ring-primary"
                }
              `}
              title={section.title} // Tooltip for accessibility
            >
              <IconComponent
                className={`h-6 w-6 mb-0.5 ${
                  isActive ? "text-on-primary-container" : "text-on-surface-variant group-hover:text-on-surface" // Changed to on-primary-container
                }`}
              />
              <span className="text-xs leading-tight text-center">
                {section.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
