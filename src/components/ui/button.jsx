import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpha-violet focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-alpha-violet text-alpha-white hover:bg-alpha-violet/90 hover:shadow-lg hover:shadow-alpha-violet/20',
        destructive: 'bg-alpha-red text-alpha-white hover:bg-alpha-red/90',
        outline: 'border-2 border-alpha-violet bg-transparent text-alpha-white hover:bg-alpha-violet/10',
        secondary: 'bg-alpha-navy text-alpha-white border border-alpha-violet/20 hover:bg-alpha-navy/80',
        ghost: 'hover:bg-alpha-violet/10 hover:text-alpha-violet text-alpha-grey',
        link: 'text-alpha-violet underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };