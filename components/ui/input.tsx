import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-14 w-full items-center rounded-lg border-2 border-outline bg-surface-variant px-4 text-base text-on-surface-variant placeholder:text-on-surface-variant/70 transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-on-surface-variant/50 disabled:border-on-surface-variant/50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
