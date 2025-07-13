'use client';

import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/contexts/favorites-context';

type Resource = {
  title: string;
  href: string;
  description: string;
  section: string;
  icon?: React.FC<{ className?: string }>;
};

interface BookmarkButtonProps {
  resource: Resource;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function BookmarkButton({
  resource,
  className,
  size = 'md',
}: BookmarkButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isBookmarked = isFavorite(resource.href);

  const handleToggleBookmark = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBookmarked) {
      removeFavorite(resource.href);
    } else {
      addFavorite(resource);
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
          ? `Remove ${resource.title} from favorites`
          : `Add ${resource.title} to favorites`
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
        {isBookmarked ? 'Remove from favorites' : 'Add to favorites'}
      </span>
    </button>
  );
}
