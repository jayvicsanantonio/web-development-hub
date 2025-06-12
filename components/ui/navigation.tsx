"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SearchIcon from "@/components/icons/search";
import MountainIcon from "@/components/icons/mountain";
import { SECTIONS } from "@/constants/sections";

export default function Navigation() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const filteredSections = SECTIONS.map((section) => {
    const filteredLinks = section.links.filter((link) =>
      link.title.toLowerCase().includes(search.toLowerCase())
    );
    return {
      ...section,
      links: filteredLinks,
    };
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav className="w-full xl:w-1/5 bg-card dark:bg-card py-4 px-8 flex flex-row justify-between xl:flex-col xl:justify-normal gap-8 xl:h-screen xl:overflow-y-auto sticky top-0 z-10">
      <Link className="flex items-center gap-2" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Web Development Hub</span>
      </Link>
      <div className="hidden xl:flex">
        <form className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchRef}
            className="pl-10 pr-4 py-2 rounded-md bg-popover dark:bg-popover dark:text-popover-foreground focus:outline-hidden focus:ring-1 focus:ring-ring dark:focus:ring-ring"
            placeholder="Search..."
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute top-1/2 -translate-y-1/2 right-2 hidden sm:flex items-center justify-center px-2.5 py-[3px] gap-2.5 bg-muted dark:bg-muted rounded-md border border-border border-opacity-40 text-muted-foreground text-sm font-medium peer-focus:hidden select-none tracking-[2.80px]">
            ⌘K
          </span>
        </form>
      </div>
      <Accordion type="single" className="hidden xl:block" collapsible>
        {filteredSections.map(
          (section) =>
            section.links.length > 0 && (
              <AccordionItem key={section.title} value={section.title}>
                <AccordionTrigger>{section.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-3">
                    {section.links.map((link) => (
                      <Link
                        key={link.title}
                        className="group flex items-center gap-3 rounded-md bg-white px-4 py-3 shadow-xs transition-colors hover:bg-accent dark:bg-popover dark:hover:bg-accent"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.icon className="h-6 w-6 text-muted-foreground group-hover:text-accent-foreground" />
                        <p className="text-sm font-medium text-foreground group-hover:text-accent-foreground">
                          {link.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
        )}
      </Accordion>
    </nav>
  );
}
