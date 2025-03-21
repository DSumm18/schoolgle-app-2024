'use client';

import * as React from 'react';
import { Eye } from 'lucide-react';

export function AccessibilityToggle() {
  const [highContrast, setHighContrast] = React.useState(false);

  React.useEffect(() => {
    // Check if high contrast mode is already enabled
    const isHighContrast = document.documentElement.classList.contains('high-contrast');
    setHighContrast(isHighContrast);
  }, []);

  const toggleHighContrast = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    
    if (newState) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return (
    <button
      onClick={toggleHighContrast}
      className="rounded-md w-9 h-9 p-2 inline-flex items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
      aria-label="Toggle high contrast"
    >
      <Eye className="h-4 w-4 text-gray-700 dark:text-gray-300" />
      <span className="sr-only">Toggle high contrast</span>
    </button>
  );
}