import { useState, useEffect, useRef, useCallback } from 'react';

export const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const timeoutRef = useRef(null);
  
  const handleResize = useCallback(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Debounce resize event by 150ms
    timeoutRef.current = setTimeout(() => {
      setWidth(window.innerWidth);
    }, 150);
  }, []);

  useEffect(() => {
    // Use passive listener for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleResize]);
  
  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024
  };
};
