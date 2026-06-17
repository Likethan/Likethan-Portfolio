import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after 2.5 seconds (1.6s water-fill + 0.9s delay)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader-overlay"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <motion.div 
            className="preloader-container"
            exit={{ 
              scale: 0.92, 
              opacity: 0, 
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
            }}
          >
            {/* Background transparent text */}
            <div className="preloader-text-bg">Likethan.</div>
            
            {/* Foreground white text with clip-path/water-fill */}
            <div className="preloader-text-fg">Likethan.</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
