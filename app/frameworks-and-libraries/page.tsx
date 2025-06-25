import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SECTIONS } from '@/constants/sections';

export default function Page() {
  return (
    <div className="container px-4 md:px-6 flex flex-col gap-10">
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {SECTIONS[2].links.map((link) => (
          <Link
            key={link.title}
            className="group flex items-center gap-3 rounded-md bg-white p-6 shadow-xs transition-colors hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-800"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <link.icon width={50} height={50} />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 group-hover:text-gray-900 dark:text-gray-50 dark:group-hover:text-gray-50">
                {link.title}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
