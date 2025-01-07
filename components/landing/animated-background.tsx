"use client";

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function AnimatedBackground() {
  // Generate deterministic positions using useMemo
  const floatingElements = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 5) % 100}%`,
      top: `${(i * 7) % 100}%`,
      z: (i * 5) % 100,
      duration: 15 + (i % 5) * 5,
      delay: i * 0.5
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* 3D Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background/90" />
      
      {/* Animated 3D patterns */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          rotateX: [0, 2, 0],
          rotateY: [0, 2, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `
            radial-gradient(
              circle at center,
              hsl(var(--primary) / 0.15) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* 3D Floating elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
      >
        {floatingElements.map(({ id, left, top, z, duration, delay }) => (
          <motion.div
            key={id}
            className="absolute w-2 h-2 bg-primary/40 rounded-full blur-[1px]"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: ['0vw', '10vw', '0vw'],
              y: ['0vh', '10vh', '0vh'],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay,
            }}
            style={{
              left,
              top,
              transform: `translateZ(${z}px)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
} 