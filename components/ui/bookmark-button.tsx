// The save/unsave control on a resource card.
'use client';

import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookmarks } from '@/contexts/bookmarks-context';

interface BookmarkButtonProps {
  href: string;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BookmarkButton({
  href,
  title,
  className,
  size = 'md',
}: BookmarkButtonProps) {
  const {
    isBookmarked: isFavorite,
    addBookmark: addFavorite,
    removeBookmark: removeFavorite,
  } = useBookmarks();

  const isBookmarked = isFavorite(href);

  const handleToggleBookmark = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBookmarked) {
      removeFavorite(href);
    } else {
      addFavorite(href);
    }
  };

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const iconSize = sizeClasses[size];

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
        <BookmarkCheck className={cn('text-accent-neon', iconSize)} />
      ) : (
        <Bookmark
          className={cn(
            'text-muted-foreground group-hover:text-foreground',
            iconSize
          )}
        />
      )}
      <span className="sr-only">
        {isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
      </span>
    </button>
  );
}
