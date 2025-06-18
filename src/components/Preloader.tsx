'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Hide sidebar toggle during loading
    const sidebarToggle = document.querySelector('button[aria-label="Toggle Sidebar"]');
    if (sidebarToggle) {
      sidebarToggle.classList.add('hidden');
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          // Show sidebar toggle after loading
          if (sidebarToggle) {
            sidebarToggle.classList.remove('hidden');
          }
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(interval);
      // Ensure sidebar toggle is visible if component unmounts
      if (sidebarToggle) {
        sidebarToggle.classList.remove('hidden');
      }
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center w-64">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-pink-500 border-b-green-500 border-l-purple-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-black"></div>
          </div>
        </div>
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
          Loading...
        </div>
        {/* Loading Bar */}
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-400">
          {progress}%
        </div>
      </div>
    </div>
  );
} 