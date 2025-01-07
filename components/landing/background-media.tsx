"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BackgroundMediaProps {
  imageUrl: string;
  videoUrl: string;
  variants?: {
    initial: { opacity: number };
    animate: { opacity: number };
  };
}

export function BackgroundMedia({ imageUrl, videoUrl, variants }: BackgroundMediaProps) {
  const [currentMedia, setCurrentMedia] = useState<'image' | 'video'>('image');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMedia(prev => prev === 'image' ? 'video' : 'image');
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/60" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      <AnimatePresence mode="wait">
        {currentMedia === 'image' ? (
          <motion.div
            key="image"
            variants={variants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: 'center 30%',
              backgroundSize: 'cover',
              imageRendering: '-webkit-optimize-contrast',
              filter: 'brightness(1.2) contrast(1.05) saturate(1.1)'
            }}
          />
        ) : (
          <motion.div
            key="video"
            variants={variants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                filter: 'brightness(1.2) contrast(1.05) saturate(1.1)'
              }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 