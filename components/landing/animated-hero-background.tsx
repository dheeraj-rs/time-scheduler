"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const colors = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
];

export function AnimatedHeroBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
      {/* Animated gradient orbs */}
      {colors.map((color, i) => (
        <motion.div
          key={color}
          className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          animate={{
            x: [
              mousePosition.x - 250 + Math.sin(i * (Math.PI / 1.5)) * 200,
              mousePosition.x - 250 + Math.cos(i * (Math.PI / 1.5)) * 200,
            ],
            y: [
              mousePosition.y - 250 + Math.cos(i * (Math.PI / 1.5)) * 200,
              mousePosition.y - 250 + Math.sin(i * (Math.PI / 1.5)) * 200,
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
          style={{
            background: `radial-gradient(circle at center, ${color}, transparent)`,
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary)/0.2) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary)/0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background/90" />
    </div>
  );
} 