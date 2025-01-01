"use client";

import { useEffect, useState } from 'react';
import { Calendar, MapPin, Ticket, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';

export function LandingHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const nextEvent = {
    title: "International Science Conference 2024",
    date: new Date('2025-01-15'),
    location: "Global Science Center",
    imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = nextEvent.date.getTime() - new Date().getTime();
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [nextEvent.date]);

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${nextEvent.imageUrl})`,
          filter: 'brightness(0.3)'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          {nextEvent.title}
        </h1>
        
        <div className="flex items-center gap-4 text-white mb-8">
          <Calendar className="w-6 h-6" />
          <span>{format(nextEvent.date, 'dd/MM/yyyy')}</span>
          <MapPin className="w-6 h-6 ml-4" />
          <span>{nextEvent.location}</span>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mb-12">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <Card key={unit} className="bg-white/10 backdrop-blur-lg p-4 text-center text-white border-none">
              <span className="text-4xl font-bold block">{value}</span>
              <span className="text-sm uppercase">{unit}</span>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl">
          <Button 
            size="lg" 
            className="w-full sm:w-auto px-8 h-14 text-lg bg-primary hover:bg-primary/90 hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-primary/25"
            asChild
          >
            <Link href="/program/tickets" className="flex items-center justify-center gap-2">
              <Ticket className="h-5 w-5" />
              <span>Book Tickets</span>
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            className="w-full sm:w-auto px-8 h-14 text-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/20 hover:border-white/40 hover:scale-105 transform transition-all duration-200"
            asChild
          >
            <Link href="/venues" className="flex items-center justify-center gap-2">
              <Building2 className="h-5 w-5" />
              <span>Explore Venues</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}