'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AnimatedLogo({ 
  className = '',
  size = 'md',
}: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl lg:text-5xl',
  };
  
  // Colors for each letter
  const letterColors = [
    'text-blue-500',    // S
    'text-red-500',     // c
    'text-yellow-500',  // h
    'text-blue-500',    // o
    'text-green-500',   // o
    'text-red-500',     // l
    'text-yellow-500',  // g
    'text-blue-500',    // l
    'text-green-500',   // e
  ];
  
  // Animation for each letter
  const letterAnimation = {
    hover: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        y: {
          duration: 0.5,
          repeat: 0,
          ease: "easeOut",
          delay: i * 0.05,
        }
      }
    }),
    nonHover: {
      y: 0,
      transition: {
        y: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    }
  };
  
  // Split the word into individual letters
  const letters = "Schoolgle".split("");
  
  return (
    <Link href="/">
      <motion.div
        className={`font-bold ${sizeClasses[size]} ${className}`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span 
          className="inline-flex"
          animate={isHovered ? 'hover' : 'nonHover'}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className={letterColors[i]}
              variants={letterAnimation}
              custom={i}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      </motion.div>
    </Link>
  );
}