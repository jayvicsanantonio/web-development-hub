// The landing page's preview of one section: its first few resources. It takes
// the slug, not the resources, so they are not serialised into the payload.
'use client';

import ResourceGrid from '@/components/ui/resource-grid';
import { sectionBySlug } from '@/constants/sections';

export const PREVIEW_COUNT = 6;

export function SectionPreviewGrid({ slug }: { slug: string }) {
  return (
    <ResourceGrid
      resources={sectionBySlug(slug).links.slice(0, PREVIEW_COUNT)}
    />
  );
}
