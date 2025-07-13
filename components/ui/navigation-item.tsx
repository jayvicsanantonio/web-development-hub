import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface NavigationItemProps {
  item: {
    id: string;
    title: string;
    icon?: React.FC<{ className?: string }>;
  };
  isActive: boolean;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  variant?: 'mobile' | 'desktop';
  index?: number;
  totalItems?: number;
  'aria-describedby'?: string;
  href?: string;
}

export const NavigationItem = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  NavigationItemProps
>(
  (
    {
      item,
      isActive,
      onClick,
      onKeyDown,
      variant = 'desktop',
      index,
      totalItems,
      'aria-describedby': ariaDescribedBy,
      href,
    },
    ref
  ) => {
    const Icon = item.icon;

    if (variant === 'mobile') {
      const content = (
        <>
          {Icon && (
            <Icon
              className={cn(
                'h-5 w-5',
                isActive
                  ? 'text-foreground opacity-90'
                  : 'text-foreground opacity-70'
              )}
              aria-hidden="true"
            />
          )}
          <span
            className={cn(isActive ? 'font-medium' : 'font-normal')}
          >
            {item.title}
          </span>
        </>
      );

      if (href) {
        return (
          <Link
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            onClick={onClick}
            className={cn(
              'mobile-nav-item flex w-full items-center gap-3 p-3 rounded-md transition-all duration-200  focus:ring-2 focus:ring-accent-neon',
              isActive
                ? 'bg-background-muted/50 border-l-2 border-accent-neon text-accent-neon font-medium'
                : 'hover:bg-background-muted/30 border-l-2 border-transparent'
            )}
            aria-current={isActive ? 'page' : undefined}
            onKeyDown={onKeyDown}
          >
            {content}
          </Link>
        );
      }

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={onClick}
          className={cn(
            'mobile-nav-item flex w-full items-center gap-3 p-3 rounded-md transition-all duration-200  focus:ring-2 focus:ring-accent-neon',
            isActive
              ? 'bg-background-muted/50 border-l-2 border-accent-neon text-accent-neon font-medium'
              : 'hover:bg-background-muted/30 border-l-2 border-transparent'
          )}
          aria-current={isActive ? 'page' : undefined}
          onKeyDown={onKeyDown}
        >
          {content}
        </button>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={cn(
          'cursor-pointer desktop-nav-button w-3 h-3 rounded-full transition-all duration-300  focus:ring-2 focus:ring-accent-neon focus:ring-offset-2',
          isActive
            ? 'bg-foreground shadow-sm ring-2 ring-foreground/20'
            : 'bg-foreground/40 hover:bg-foreground/60 hover:scale-110'
        )}
        aria-label={`Navigate to ${item.title} section`}
        aria-current={isActive ? 'page' : undefined}
        aria-describedby={ariaDescribedBy}
        onKeyDown={onKeyDown}
      />
    );
  }
);

NavigationItem.displayName = 'NavigationItem';
