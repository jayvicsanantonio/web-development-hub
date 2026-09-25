// Every section page, from one route: a static page per section in the
// dataset, each a server component so it carries its own metadata. The client
// component gets only the slug: its props are serialised into the page's
// payload, and the client bundle already holds the dataset.
import type { Metadata } from 'next';
import { CategoryPage } from '@/components/category-page';
import { SECTIONS, sectionBySlug } from '@/constants/sections';

type Props = { params: Promise<{ section: string }> };

// Only the sections in the dataset are pages; any other path is the 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((section) => ({
    section: section.href.slice(1),
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const section = sectionBySlug((await params).section);

  return {
    title: section.title,
    description: section.description,
    alternates: { canonical: section.href },
    openGraph: {
      title: section.title,
      description: section.description,
      url: section.href,
    },
  };
}

export default async function Page({ params }: Props) {
  return <CategoryPage slug={(await params).section} />;
}
