// Shapes for the curated resource dataset in constants/sections.ts.
// SECTIONS is checked against these, so a malformed entry fails typecheck.

export type ResourceLink = {
  title: string;
  href: string;
  /** An Iconify icon name, such as `simple-icons:react`. */
  icon: string;
  description: string;
  tags: string[];
};

export type Section = {
  title: string;
  href: string;
  /** An Iconify icon name, drawn beside the section in the nav. */
  icon: string;
  description: string;
  links: ResourceLink[];
};

// A dataset link carrying the section it came from, for the views that list
// resources from more than one section and group them.
export type Resource = ResourceLink & {
  section: string;
};
