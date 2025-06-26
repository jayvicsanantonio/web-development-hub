import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SECTIONS } from '@/constants/sections';
import ResourceCard from '@/components/ui/resource-card';

export default function Page() {
  const sectionData = SECTIONS.find(
    (section) => section.title === 'Blogs'
  );
  const resources = (sectionData?.links || []).map((link) => ({
    title: link.title,
    href: link.href,
    description: link.description,
  }));

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 flex flex-col gap-10">
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Blogs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
        <p className="text-foreground-muted max-w-[700px]">
          Stay updated with insights from industry experts and thought
          leaders
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.href}
            resource={resource}
            accentColor="purple"
          />
        ))}
      </div>
    </div>
  );
}
