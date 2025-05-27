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
        'flex h-14 w-full rounded-xs border border-outline bg-surface px-4 items-center text-base text-on-surface placeholder:text-on-surface-variant transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium focus-visible:outline-none focus-visible:border-primary focus-visible:border-2 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-on-surface/[.04] disabled:border-on-surface/[.12]',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
