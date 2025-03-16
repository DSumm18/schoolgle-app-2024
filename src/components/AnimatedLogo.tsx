'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedLogo({ className = '' }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Staggered animation for letters
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300
      }
    }
  };
  
  const colors = [
    'text-blue-500',   // S
    'text-red-500',    // c
    'text-yellow-500', // h
    'text-blue-500',   // o
    'text-green-500',  // o
    'text-red-500',    // g
    'text-yellow-500', // l
    'text-blue-500',   // e
  ];
  
  const letters = 'Schoolgle'.split('');
  
  return (
    <motion.div 
      className={`font-bold flex items-center ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={`text-3xl ${colors[index]} transition-all duration-300`}
          variants={letterVariants}
          animate={isHovered ? {
            y: [0, -10, 0],
            scale: [1, 1.2, 1],
            transition: { 
              duration: 0.5,
              delay: index * 0.05,
              ease: "easeInOut"
            }
          } : {}}
          whileHover={{ scale: 1.2 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}