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
    (section) => section.title === 'Frameworks & Libraries'
  );
  const resources = sectionData?.links || [];

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
              <BreadcrumbPage>Frameworks & Libraries</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight">
          Frameworks & Libraries
        </h1>
        <p className="text-foreground-muted max-w-[700px]">
          Powerful frameworks and libraries to build modern web
          applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.href}
            resource={resource}
            accentColor="neon"
          />
        ))}
      </div>
    </div>
  );
}
