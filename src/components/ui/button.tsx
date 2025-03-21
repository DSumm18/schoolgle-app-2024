'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case "destructive":
          return "bg-red-500 text-white shadow-sm hover:bg-red-600";
        case "outline":
          return "border border-gray-300 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-800";
        case "secondary":
          return "bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-300";
        case "ghost":
          return "hover:bg-gray-100 hover:text-gray-800";
        case "link":
          return "text-blue-600 underline-offset-4 hover:underline";
        default:
          return "bg-blue-600 text-white shadow hover:bg-blue-700";
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case "sm":
          return "h-8 rounded-md px-3 text-xs";
        case "lg":
          return "h-10 rounded-md px-8";
        case "icon":
          return "h-9 w-9";
        default:
          return "h-9 px-4 py-2";
      }
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
          getVariantClasses(),
          getSizeClasses(),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };