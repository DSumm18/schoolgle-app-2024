'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  return (
    <button
      className="rounded-md w-9 h-9 p-2 inline-flex items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
      aria-label="Select language"
    >
      <Globe className="h-4 w-4 text-gray-700 dark:text-gray-300" />
      <span className="sr-only">Select language</span>
    </button>
  );
}