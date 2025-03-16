'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Button variants using class-variance-authority
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700',
        outline: 'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
        ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        destructive: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

// Animation variants for the button
const buttonAnimation = {
  tap: { scale: 0.95 },
  hover: { 
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    y: -2,
    transition: { duration: 0.2 }
  }
};

const AnimatedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, asChild = false, ...props }, ref) => {
    // Common button props
    const buttonProps = {
      ref,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    };

    // If href is provided, render as Link
    if (href) {
      return (
        <Link href={href} passHref>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonAnimation}
            {...buttonProps}
          />
        </Link>
      );
    }

    // Otherwise render as a regular button
    return (
      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={buttonAnimation}
        {...buttonProps}
      />
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton, buttonVariants };