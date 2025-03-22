'use client';

import React from 'react';

// This is a simplified implementation of framer-motion
// It provides the basic API structure but without the actual animations
// This is just to make the build pass

interface MotionProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
  initial?: any;
  animate?: any;
  transition?: any;
  exit?: any;
  style?: React.CSSProperties;
  [key: string]: any;
}

// Simple motion component that just renders its children
export const motion = {
  div: ({ children, className, ...props }: MotionProps) => {
    return <div className={className}>{children}</div>;
  },
  section: ({ children, className, ...props }: MotionProps) => {
    return <section className={className}>{children}</section>;
  },
  span: ({ children, className, ...props }: MotionProps) => {
    return <span className={className}>{children}</span>;
  },
  h1: ({ children, className, ...props }: MotionProps) => {
    return <h1 className={className}>{children}</h1>;
  },
  h2: ({ children, className, ...props }: MotionProps) => {
    return <h2 className={className}>{children}</h2>;
  },
  h3: ({ children, className, ...props }: MotionProps) => {
    return <h3 className={className}>{children}</h3>;
  },
  p: ({ children, className, ...props }: MotionProps) => {
    return <p className={className}>{children}</p>;
  },
  ul: ({ children, className, ...props }: MotionProps) => {
    return <ul className={className}>{children}</ul>;
  },
  li: ({ children, className, ...props }: MotionProps) => {
    return <li className={className}>{children}</li>;
  },
  button: ({ children, className, ...props }: MotionProps) => {
    return <button className={className}>{children}</button>;
  },
  a: ({ children, className, ...props }: MotionProps) => {
    return <a className={className}>{children}</a>;
  },
  img: ({ className, ...props }: MotionProps) => {
    return <img className={className} {...props} />;
  },
};

// Utility functions
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const useScroll = () => {
  return { scrollYProgress: { current: 0 } };
};

export const useTransform = () => {
  return 0;
};

export function useMotionValue(initial: number) {
  return { get: () => initial, set: () => {}, onChange: () => {} };
}

export function useSpring(value: any) {
  return value;
}

export default motion;