"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { SECTIONS } from '@/constants/sections'; // Assuming this path is correct

export default function ModalNavigationDrawer() {
  const { isDrawerOpen, closeDrawer } = useAppStore();
  const pathname = usePathname();

  // if (!isDrawerOpen) { // This conditional rendering is handled by the translate-x class now
  //   return null; 
  // }

  return (
    <>
      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-surface text-on-surface shadow-md3-elevation-1 p-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-modal="true" // For accessibility
        role="dialog" // For accessibility
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-xl text-on-surface px-3">Menu</h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-2 rounded-full hover:bg-on-surface/10 text-on-surface"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {SECTIONS.map((section) => {
            // Ensure section.href is defined; provide a fallback if necessary
            const sectionHref = section.href || '#'; 
            const isActive = pathname === sectionHref || (sectionHref !== "/" && pathname.startsWith(sectionHref + '/'));
            
            return (
              <Link
                key={section.title}
                href={sectionHref}
                onClick={closeDrawer} // Close drawer on link click
                className={`flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'text-on-surface-variant hover:bg-on-surface/5'
                  }
                `}
              >
                <section.icon className="h-6 w-6" /> {/* Icon color will be inherited or intrinsic */}
                <span>{section.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
