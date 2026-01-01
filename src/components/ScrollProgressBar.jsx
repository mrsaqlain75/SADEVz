import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (windowHeight > 0) {
        const progress = (scrollTop / windowHeight) * 100;
        setScrollProgress(progress);
      }
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999]">
      <motion.div 
        className="h-full"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #00bcd4 0%, #4dd0e1 100%)',
          boxShadow: '0 0 15px rgba(0, 188, 212, 0.7)',
          transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default ScrollProgressBar;