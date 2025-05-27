"use client"; // Required for onClick handlers, even if placeholders for now

"use client"; // Required for onClick handlers, even if placeholders for now

import Link from 'next/link';
import { Search } from 'lucide-react'; // Removed Menu
import MountainIcon from '@/components/icons/mountain';
// Removed useAppStore import

export default function TopAppBar() {
  // Removed toggleDrawer

  return (
    <header className="bg-surface text-on-surface shadow-md3-elevation-1 sticky top-0 z-40 flex items-center justify-between h-16 px-4">
      <div className="flex items-center gap-2">
        {/* Hamburger menu button removed */}
        <Link href="/" className="flex items-center gap-2 text-on-surface">
          <MountainIcon className="h-8 w-8" /> {/* Or appropriate size */}
          <span className="font-heading text-lg font-semibold">Web Dev Hub</span>
        </Link>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-on-surface/10 text-on-surface"
          aria-label="Search"
          onClick={() => console.log('Search clicked - placeholder')}
        >
          <Search size={24} />
        </button>
        {/* Other potential elements like profile icon could go here */}
      </div>
    </header>
  );
}
