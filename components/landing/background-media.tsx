"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackgroundMediaProps {
  imageUrl: string;
  videoUrl: string;
}

export function BackgroundMedia({ imageUrl, videoUrl }: BackgroundMediaProps) {
  const [currentMedia, setCurrentMedia] = useState<'image' | 'video'>('image');
  
  useEffect(() => {
    // Switch between image and video every 10 seconds
    const interval = setInterval(() => {
      setCurrentMedia(prev => prev === 'image' ? 'video' : 'image');
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        {currentMedia === 'image' ? (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center 30%'
            }}
          />
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 