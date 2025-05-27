import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:brightness-110 active:brightness-90',
  {
    variants: {
      variant: {
        default: // MD3 Filled Button
          'bg-primary text-on-primary hover:bg-primary/[.92] disabled:bg-on-surface/10 disabled:text-on-surface/30',
        destructive: // MD3 Filled Button - Error Colors
          'bg-error text-on-error hover:bg-error/[.92] disabled:bg-on-surface/10 disabled:text-on-surface/30',
        outline: // MD3 Outlined Button
          'border border-outline text-primary hover:bg-primary/5 active:bg-primary/10 disabled:border-on-surface/10 disabled:text-on-surface/30',
        secondary: // MD3 Tonal Button (using Secondary colors)
          'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/[.92] disabled:bg-on-surface/10 disabled:text-on-surface/30',
        ghost: // MD3 Text Button
          'text-primary hover:bg-primary/5 active:bg-primary/10 disabled:text-on-surface/30',
        link: // MD3 Text Button with underline
          'text-primary underline underline-offset-4 hover:bg-primary/5 active:bg-primary/10 disabled:text-on-surface/30',
      },
      size: {
        default: 'h-10 px-6 py-2', // Approx 40dp height, 24dp side padding
        sm: 'h-9 px-5 text-xs',    // Approx 36dp height
        lg: 'h-12 px-7',           // Approx 48dp height
        icon: 'h-10 w-10',         // Approx 40dp square
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
