// The save/unsave control on a resource card.
'use client';

import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookmarks } from '@/contexts/bookmarks-context';

interface BookmarkButtonProps {
  /** What a bookmark stores. */
  resourceId: string;
  title: string;
  className?: string;
}

export function BookmarkButton({
  resourceId,
  title,
  className,
}: BookmarkButtonProps) {
  const { isBookmarked: isSaved, addBookmark, removeBookmark } =
    useBookmarks();

  const isBookmarked = isSaved(resourceId);

  const handleToggleBookmark = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBookmarked) {
      removeBookmark(resourceId);
    } else {
      addBookmark(resourceId);
    }
  };

  return (
    <button
      onClick={handleToggleBookmark}
      className={cn(
        'group relative flex items-center justify-center rounded-full p-1 transition-colors',
        'hover:bg-background-secondary ',
        className
      )}
      aria-label={
        isBookmarked
          ? `Remove ${title} from bookmarks`
          : `Add ${title} to bookmarks`
      }
    >
      {isBookmarked ? (
        <BookmarkCheck className="text-accent-neon h-5 w-5" />
      ) : (
        <Bookmark className="text-muted-foreground group-hover:text-foreground h-5 w-5" />
      )}
      <span className="sr-only">
        {isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      </span>
    </button>
  );
}
