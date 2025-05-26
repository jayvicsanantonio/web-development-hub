import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SECTIONS } from "@/constants/sections";

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
            <BreadcrumbPage>Learning Resources</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {SECTIONS[0].links.map((link) => (
          <Link
            key={link.title}
            className="group flex items-center gap-3 rounded-2xl bg-card p-4 shadow-cute-md transition-transform duration-200 ease-out hover:transform hover:-translate-y-1 hover:scale-103"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <link.icon width={50} height={50} />
            <div className="flex-1">
              <p className="text-sm font-heading font-semibold text-card-foreground group-hover:text-primary">
                {link.title}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-card-foreground">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
