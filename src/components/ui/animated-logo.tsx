'use client';

import React, { useState } from 'react';

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded overflow-hidden shadow-md transition-all duration-300 ease-in-out transform">
        <span className="font-bold text-xl text-white">S</span>
      </div>
      <div className="ml-2">
        <span className="font-bold text-lg text-gray-900 dark:text-white">Schoolgle</span>
      </div>
    </div>
  );
}