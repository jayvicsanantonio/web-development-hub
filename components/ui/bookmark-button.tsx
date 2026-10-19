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
        'group/bookmark relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm',
        'hover:bg-background',
        className
      )}
      aria-label={
        isBookmarked
          ? `Remove ${title} from bookmarks`
          : `Add ${title} to bookmarks`
      }
    >
      {isBookmarked ? (
        <Bookmark className="h-[1.125rem] w-[1.125rem] fill-current text-accent" />
      ) : (
        <Bookmark className="h-[1.125rem] w-[1.125rem] text-muted-foreground group-hover/bookmark:text-foreground" />
      )}
      <span className="sr-only">
        {isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      </span>
    </button>
  );
}
