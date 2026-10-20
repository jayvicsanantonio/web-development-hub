// The save/unsave control on a resource card.
'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
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
        'cursor-pointer relative flex h-8 w-8 items-center justify-center rounded-md',
        isBookmarked
          ? 'text-primary hover:bg-primary/10'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground',
        className
      )}
      aria-label={
        isBookmarked
          ? `Remove ${title} from bookmarks`
          : `Add ${title} to bookmarks`
      }
    >
      <Bookmark
        className={cn('h-4 w-4', isBookmarked && 'fill-current')}
        aria-hidden="true"
      />
      <span className="sr-only">
        {isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      </span>
    </button>
  );
}
