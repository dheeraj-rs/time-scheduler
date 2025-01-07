"use client";

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Calendar, MapPin, Ticket, Building2, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { BackgroundMedia } from '@/components/landing/background-media';

// Enhanced animation variants
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const backgroundVariants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 0.3,
    transition: {
      duration: 2,
      ease: "easeOut"
    }
  }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const countdownVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    rotateX: -30
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const numberVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { y: -50, opacity: 0 }
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: { 
    scale: 0.95 
  }
};

export function LandingHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const nextEvent = useMemo(() => ({
    title: "International Science Conference 2024",
    date: new Date('2025-01-15'),
    location: "Global Science Center",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
    videoUrl: "/conference-video.mp4"
  }), []);

  const calculateTimeLeft = useCallback(() => {
    const difference = nextEvent.date.getTime() - new Date().getTime();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }, [nextEvent.date]);

  useEffect(() => {
    let mounted = true;

    const updateTime = () => {
      if (mounted) {
        setTimeLeft(calculateTimeLeft());
      }
    };

    // Initial calculation
    updateTime();

    // Update every second
    const timer = setInterval(updateTime, 1000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [calculateTimeLeft]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <BackgroundMedia 
        imageUrl={nextEvent.imageUrl}
        videoUrl={nextEvent.videoUrl}
      />
      
      <motion.div 
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
        className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start pt-20"
      >
        <motion.h1 
          variants={fadeIn}
          className="text-6xl font-bold text-white pt-20 mb-6 drop-shadow-lg"
        >
          {nextEvent.title}
        </motion.h1>
        
        <motion.div 
          variants={fadeIn}
          className="flex items-center gap-4 text-white mb-8"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2"
          >
            <Calendar className="w-6 h-6" />
            <span>{format(nextEvent.date, 'dd/MM/yyyy')}</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2"
          >
            <MapPin className="w-6 h-6 ml-4" />
            <span>{nextEvent.location}</span>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={staggerChildren}
          className="grid grid-cols-4 gap-4 max-w-2xl mb-12"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              variants={countdownVariants}
              whileHover={{ scale: 1.02, rotateX: 5 }}
              className="countdown-card relative group"
            >
              <Card className="relative overflow-hidden backdrop-blur-xl bg-black/20 border-primary/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                <div className="relative z-10 p-4 text-center">
                  <div className="countdown-number-wrapper">
                    <motion.div 
                      className="text-4xl font-bold font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                      initial={false}
                      animate={{ 
                        opacity: [0.8, 1],
                        scale: [0.98, 1],
                        transition: { 
                          duration: 0.6,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }
                      }}
                    >
                      {value.toString().padStart(2, '0')}
                      <div className="countdown-shine" />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70 font-medium"
                  >
                    {unit}
                  </motion.div>
                </div>

                <div className="countdown-border-glow" />
                <div className="countdown-progress" style={{ 
                  '--progress': unit === 'seconds' ? `${(value / 60) * 100}%` : '100%'
                } as React.CSSProperties} />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="flex flex-col sm:flex-row items-center gap-4 max-w-xl"
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 h-14 text-lg bg-primary hover:bg-primary/90 transform transition-all duration-200 shadow-lg hover:shadow-primary/25"
              asChild
            >
              <Link href="/program/tickets" className="flex items-center justify-center gap-2">
                <Ticket className="h-5 w-5" />
                <span>Book Tickets</span>
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto px-8 h-14 text-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/20 hover:border-white/40 transform transition-all duration-200"
              asChild
            >
              <Link href="/venues" className="flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5" />
                <span>Explore Venues</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-[2px] h-16 bg-gradient-to-b from-primary/50 to-primary mb-2" />
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}