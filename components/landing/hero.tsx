"use client";

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Calendar, MapPin, Ticket, Building2, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';
import { BackgroundMedia } from '@/components/landing/background-media';

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
    rotateX: -30,
    y: 20
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 1
    }
  }
};

const letterVariants = {
  initial: { 
    opacity: 0,
    y: 20,
    rotate: 10,
    scale: 0.5
  },
  animate: { 
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100
    }
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
    imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070",
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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <BackgroundMedia 
          imageUrl={nextEvent.imageUrl}
          videoUrl={nextEvent.videoUrl}
          variants={backgroundVariants}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
      </div>
      
      <motion.div 
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="relative container mx-auto px-4 min-h-[100svh] flex flex-col justify-center items-start"
      >
        <motion.div 
          variants={fadeIn}
          className="md:hidden mb-4 inline-flex items-center bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2"
        >
          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-primary" />
          <span className="text-sm text-primary font-medium">Live Event</span>
        </motion.div>

        <motion.h1 
          variants={letterVariants}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative max-w-4xl"
        >
          <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-3xl" />
          {nextEvent.title.split('').map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className={`inline-block ${
                char === ' ' ? 'mr-2 sm:mr-4' : 'mr-[0.01em] sm:mr-[0.02em]'
              } bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 hover:text-primary transition-colors duration-200`}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.div 
          variants={fadeIn}
          className="flex flex-wrap items-center gap-2 sm:gap-4 text-muted-foreground mb-8"
        >
          <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-sm sm:text-base">{format(nextEvent.date, 'dd MMM yyyy')}</span>
          </div>
          <div className="flex items-center gap-2 bg-background/50 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-sm sm:text-base">{nextEvent.location}</span>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerChildren}
          className="grid grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-6 w-full max-w-[400px]"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              variants={countdownVariants}
              whileHover={{ 
                scale: 1.02,
                rotateX: 2,
                translateZ: 5,
                transition: {
                  duration: 0.2,
                  ease: "easeOut"
                }
              }}
              className="perspective-1000"
            >
              <Card className="countdown-card relative overflow-hidden border-primary/20 bg-background/30 backdrop-blur-md">
                <CardContent className="p-1">
                  <div className="text-center">
                    <div className="text-sm sm:text-base md:text-lg font-bold text-primary countdown-number">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[8px] uppercase tracking-wider text-muted-foreground/80 font-medium">
                      {unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Button 
            size="lg" 
            className="relative overflow-hidden backdrop-blur-sm bg-primary/80 hover:bg-primary/90 border border-primary/20 shadow-lg shadow-primary/20 transition-all duration-300 w-full sm:w-auto"
            asChild
          >
            <Link href="/program/tickets" className="flex items-center justify-center gap-2 px-4 sm:px-8">
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium">Book Tickets</span>
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="relative overflow-hidden backdrop-blur-sm bg-background/20 hover:bg-background/30 border-primary/20 hover:border-primary/40 shadow-lg shadow-black/5 transition-all duration-300 w-full sm:w-auto"
            asChild
          >
            <Link href="/venues" className="flex items-center justify-center gap-2 px-4 sm:px-8">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium">Explore Venues</span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
