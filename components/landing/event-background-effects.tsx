"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { isWinterSeason, isNewYear, isSpecialEvent } from '@/lib/utils/date';

interface EventParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
}

export function EventBackgroundEffects() {
  const [particles, setParticles] = useState<EventParticle[]>([]);
  const [eventType, setEventType] = useState<'snow' | 'confetti' | 'leaves' | null>(null);

  useEffect(() => {
    // Determine event type based on date or upcoming events
    const determineEventType = () => {
      if (isWinterSeason()) return 'snow';
      if (isNewYear()) return 'confetti';
      if (isSpecialEvent()) return 'leaves';
      return null;
    };

    setEventType(determineEventType());

    // Generate particles based on event type
    const generateParticles = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
      }));
    };

    setParticles(generateParticles());

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y + particle.speed,
          x: particle.x + Math.sin(particle.y / 50) * 0.5,
          rotation: particle.rotation + 1,
          ...(particle.y > window.innerHeight && {
            y: -20,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  if (!eventType) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              eventType === 'snow' ? 'bg-white/30' :
              eventType === 'confetti' ? 'bg-primary/30' :
              'bg-orange-500/30'
            }`}
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
} 