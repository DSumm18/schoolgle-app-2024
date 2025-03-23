'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

// Define SchoolNews interface directly in this file
interface SchoolNews {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
  author?: string;
  isFeatured?: boolean;
}

interface NewsCarouselProps {
  items: SchoolNews[];
  autoplay?: boolean;
  interval?: number;
}

export default function NewsCarousel({ 
  items, 
  autoplay = true, 
  interval = 5000 
}: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false);
  
  const itemCount = items?.length || 0;
  
  // Default image if none provided
  const defaultImage = '/images/news/default-news.jpg';
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prevIndex => 
      prevIndex === itemCount - 1 ? 0 : prevIndex + 1
    );
  }, [itemCount]);
  
  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? itemCount - 1 : prevIndex - 1
    );
  }, [itemCount]);
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused || itemCount <= 1) return;
    
    const timer = setInterval(goToNext, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, isPaused, goToNext, itemCount]);
  
  // If no items or only one, render static version
  if (!items || items.length === 0) {
    return (
      <div className="news-carousel-empty rounded-lg bg-gray-100 dark:bg-gray-800 p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">No news items available</p>
      </div>
    );
  }
  
  if (items.length === 1) {
    const item = items[0];
    return (
      <div className="news-item rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
        {item.imageUrl && (
          <div className="news-image relative h-48 w-full">
            <Image
              src={item.imageUrl || defaultImage}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={14} />
            <span>{formatDate(item.publishedAt)}</span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {item.content.substring(0, 150)}
            {item.content.length > 150 ? '...' : ''}
          </p>
        </div>
      </div>
    );
  }
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };
  
  return (
    <div 
      className="news-carousel relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-full min-h-[24rem]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {items[currentIndex].imageUrl && (
              <div className="news-image relative h-48 w-full">
                <Image
                  src={items[currentIndex].imageUrl || defaultImage}
                  alt={items[currentIndex].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {items[currentIndex].isFeatured && (
                  <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {items[currentIndex].title}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={14} />
                  <span>{formatDate(items[currentIndex].publishedAt)}</span>
                </div>
                {items[currentIndex].author && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    By {items[currentIndex].author}
                  </div>
                )}
              </div>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {items[currentIndex].content.substring(0, 200)}
                {items[currentIndex].content.length > 200 ? '...' : ''}
              </p>
              <div className="mt-4">
                <Link
                  href={`/news/${items[currentIndex].id}`}
                  className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  Read more
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 shadow-sm"
        aria-label="Previous news"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 shadow-sm"
        aria-label="Next news"
      >
        <ChevronRight size={20} />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex
                ? 'bg-indigo-600 dark:bg-indigo-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}