"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { programs } from '@/lib/data/programs';
import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react'
import { useScrollStore } from '@/lib/store/scroll-store'
import { useRouter } from 'next/navigation'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4
    }
  }
};

const imageContainerVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const overlayVariants = {
  initial: {
    opacity: 0.4,
    background: "linear-gradient(165deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)",
  },
  hover: {
    opacity: 0.65,
    background: "linear-gradient(165deg, rgba(var(--primary-rgb)/0.2) 0%, rgba(0,0,0,0.85) 100%)",
    transition: {
      duration: 0.4
    }
  }
};

const glassVariants = {
  initial: {
    opacity: 0,
    background: "radial-gradient(circle at center, rgba(var(--primary-rgb)/0.05) 0%, transparent 70%)",
  },
  hover: {
    opacity: 1,
    background: "radial-gradient(circle at center, rgba(var(--primary-rgb)/0.1) 0%, transparent 70%)",
    transition: {
      duration: 0.3
    }
  }
};

export function ProgramList() {
  const sectionRef = useRef<HTMLElement>(null)
  const { setScrollPosition, getScrollPosition, clearScrollPosition } = useScrollStore()
  const scrollKey = 'featured-programs'
  const router = useRouter()

  useEffect(() => {
    const savedPosition = getScrollPosition(scrollKey)
    if (savedPosition && sectionRef.current) {
      window.scrollTo({
        top: savedPosition,
        behavior: 'instant'
      })
    }
    clearScrollPosition(scrollKey)
  }, [getScrollPosition, clearScrollPosition])

  const handleProgramClick = (programId: string | number) => {
    setScrollPosition(scrollKey, window.scrollY)
    router.push(`/program/${programId}`)
  }

  const displayPrograms = programs.slice(0, 3);

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background via-primary/5 to-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      id="featured-programs"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Featured Programs
          </h2>
          <p className="text-muted-foreground mt-4">
            Discover our carefully curated selection of upcoming events
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPrograms.map((program) => (
            <motion.div
              key={program.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => handleProgramClick(program.id)}
              className="cursor-pointer group"
            >
              <Card className="group overflow-hidden border-muted-foreground/20 relative h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 bg-gradient-to-b from-background/95 to-background">
                <motion.div 
                  className="relative h-64 overflow-hidden"
                  variants={imageContainerVariants}
                  whileHover="hover"
                >
                  <motion.div 
                    className="absolute inset-0 bg-cover bg-center transform will-change-transform"
                    style={{ 
                      backgroundImage: `url(${program.imageUrl})`,
                      backgroundPosition: 'center 30%'
                    }}
                    variants={imageVariants}
                  />
                  <motion.div 
                    className="absolute inset-0"
                    variants={overlayVariants}
                    initial="initial"
                    whileHover="hover"
                  />
                  <motion.div 
                    className="absolute inset-0"
                    variants={glassVariants}
                    initial="initial"
                    whileHover="hover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <Badge 
                      variant={program.tickets === 'Limited' ? 'destructive' : 'secondary'}
                      className="bg-background/60 shadow-lg border border-white/10"
                    >
                      {program.tickets}
                    </Badge>
                    {program.featured && (
                      <Badge 
                        variant="default"
                        className="bg-primary/60 shadow-lg border border-primary/20"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>
                </motion.div>

                <CardHeader className="pb-2 relative">
                  <div className="absolute -top-12 left-4 right-4 flex items-center justify-between">
                    <div className="bg-background/70 px-3 py-1 rounded-full shadow-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{format(program.date, 'dd MMM yyyy')}</span>
                      </div>
                    </div>
                    <div className="bg-background/70 px-3 py-1 rounded-full shadow-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{program.time}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors mt-2">
                    {program.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {program.description}
                  </p>

                  <div className="flex items-center gap-2 text-muted-foreground mb-6">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">{program.venue.name}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t mt-auto">
                    <div>
                      <div className="font-semibold text-primary text-lg">
                        AED {program.ticketPrice}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {program.registeredAttendees}/{program.capacity} registered
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-background/80 backdrop-blur-sm hover:bg-background"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProgramClick(program.id);
                        }}
                      >
                        Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-primary/90 hover:bg-primary backdrop-blur-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/program/${program.id}/tickets`);
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          <Button 
            onClick={() => handleProgramClick(program.id)}
            size="lg" 
            variant="outline"
            className="group bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 hover:from-primary/20 hover:via-primary/30 hover:to-primary/20 border-primary/20 hover:border-primary/30 transition-all duration-300 min-w-[200px] h-12"
            asChild
          >
            <Link href="/program" className="flex items-center gap-2">
              View All Programs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}