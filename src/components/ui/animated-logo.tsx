'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedLogo() {
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    // Reset animation state after completion
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Google-inspired colors
  const colors = [
    'text-blue-500', // Google blue
    'text-red-500',  // Google red
    'text-yellow-500', // Google yellow
    'text-blue-500', // Google blue
    'text-green-500', // Google green
    'text-red-500'   // Google red
  ];
  
  const letters = ['S', 'c', 'h', 'o', 'o', 'l', 'g', 'l', 'e'];
  
  // Map letters to colors (Google-style)
  const colorMapping = {
    S: 'text-blue-500',
    c: 'text-red-500',
    h: 'text-yellow-500',
    o: 'text-blue-500',
    o: 'text-green-500',
    l: 'text-red-500',
    g: 'text-blue-500',
    l: 'text-yellow-500',
    e: 'text-green-500'
  };
  
  const letterVariants = {
    initial: { opacity: 0, y: 20, rotate: -10 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.3
      }
    }
  };
  
  const handleReplay = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  };
  
  return (
    <div className="inline-block relative">
      <div className="flex items-center">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className={`${colorMapping[letter as keyof typeof colorMapping]} font-bold inline-block`}
            variants={letterVariants}
            initial="initial"
            animate={isAnimating ? "animate" : ""}
            whileHover="hover"
            custom={i}
            onMouseEnter={() => !isAnimating && setIsAnimating(true)}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ width: "0%" }}
        animate={isAnimating ? { width: "100%" } : { width: "0%" }}
        transition={{ delay: 1, duration: 0.8 }}
        className="h-[3px] bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 absolute bottom-0 left-0"
      />
    </div>
  );
}