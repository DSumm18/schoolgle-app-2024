'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const AnimatedLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <motion.div
        className="relative w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          S
        </motion.div>
      </motion.div>
      <motion.span
        className="text-gray-800 dark:text-white text-xl font-bold"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        Schoolgle
      </motion.span>
    </Link>
  );
};

export default AnimatedLogo;