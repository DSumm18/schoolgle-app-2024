'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimatedSunIconProps {
  isActive?: boolean;
  onClick?: () => void;
  size?: number;
  className?: string;
}

export default function AnimatedSunIcon({
  isActive = false,
  onClick,
  size = 64,
  className = '',
}: AnimatedSunIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto-animate when active
  useEffect(() => {
    if (isActive) {
      setIsAnimating(true);
    } else {
      // Small delay before stopping animation when becoming inactive
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);
  
  // Colors
  const sunCenterColor = 'rgb(250, 204, 21)'; // Yellow-400
  const sunRayColor = 'rgb(251, 191, 36)';    // Amber-400
  const eyeColor = 'rgb(30, 58, 138)';        // Blue-900
  const smileColor = 'rgb(30, 58, 138)';      // Blue-900
  
  // Ray positions (8 rays at 45-degree intervals)
  const rayPositions = Array.from({ length: 8 }, (_, i) => i * 45);
  
  return (
    <motion.div
      className={`sun-icon cursor-pointer relative ${className}`}
      style={{ 
        width: size, 
        height: size, 
        display: 'inline-block' 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      aria-label="Chatbot assistant"
    >
      {/* Sun Center */}
      <motion.div
        className="sun-center absolute"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: '50%',
          backgroundColor: sunCenterColor,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
        animate={
          isAnimating || isHovered
            ? {
                scale: [1, 1.05, 1],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                },
              }
            : { scale: 1 }
        }
      >
        {/* Face - Only visible when active or hovered */}
        <motion.div
          className="sun-face absolute w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isActive || isHovered ? 1 : 0,
            transition: { duration: 0.3 }
          }}
        >
          {/* Eyes */}
          <div className="sun-eyes absolute flex justify-between" 
            style={{ 
              top: '35%', 
              left: '50%', 
              transform: 'translateX(-50%)',
              width: '60%'
            }}
          >
            <motion.div
              className="eye left-eye"
              style={{
                width: size * 0.08,
                height: size * 0.08,
                borderRadius: '50%',
                backgroundColor: eyeColor,
              }}
              animate={
                isAnimating
                  ? {
                      scale: [1, 1.2, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 3,
                        repeatType: 'reverse',
                      },
                    }
                  : {}
              }
            />
            <motion.div
              className="eye right-eye"
              style={{
                width: size * 0.08,
                height: size * 0.08,
                borderRadius: '50%',
                backgroundColor: eyeColor,
              }}
              animate={
                isAnimating
                  ? {
                      scale: [1, 1.2, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 3,
                        repeatType: 'reverse',
                      },
                    }
                  : {}
              }
            />
          </div>
          
          {/* Smile */}
          <motion.div
            className="sun-smile absolute"
            style={{
              bottom: '30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              height: size * 0.06,
              borderRadius: size * 0.06,
              backgroundColor: smileColor,
            }}
            animate={
              isAnimating
                ? {
                    width: ['40%', '50%', '40%'],
                    transition: {
                      repeat: Infinity,
                      duration: 3,
                      repeatType: 'reverse',
                    },
                  }
                : {}
            }
          />
        </motion.div>
      </motion.div>
      
      {/* Sun Rays */}
      {rayPositions.map((angle, i) => (
        <motion.div
          key={`ray-${i}`}
          className="sun-ray absolute"
          style={{
            width: size * 0.3,
            height: size * 0.08,
            backgroundColor: sunRayColor,
            borderRadius: size * 0.04,
            top: '50%',
            left: '50%',
            transformOrigin: 'left center',
            transform: `rotate(${angle}deg) translateY(-50%)`,
            zIndex: 5,
          }}
          animate={
            isAnimating || isHovered
              ? {
                  scale: [1, 1.2, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.1,
                  },
                }
              : { scale: 1 }
          }
        />
      ))}
      
      {/* Shadow effect */}
      <motion.div
        className="sun-shadow absolute rounded-full"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: isActive || isHovered
            ? '0 0 40px rgba(250, 204, 21, 0.6), 0 0 20px rgba(250, 204, 21, 0.4)'
            : '0 0 20px rgba(250, 204, 21, 0.3)',
          transition: 'box-shadow 0.3s ease',
          zIndex: 1,
        }}
      />
    </motion.div>
  );
}