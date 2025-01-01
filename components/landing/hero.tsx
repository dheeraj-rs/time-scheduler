"use client";

import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

export function LandingHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Example upcoming event
  const nextEvent = {
    title: "International Science Conference 2024",
    date: new Date('2024-06-15'),
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
    <section className="relative h-[80vh] overflow-hidden">
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

        <div className="grid grid-cols-4 gap-4 max-w-2xl">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <Card key={unit} className="bg-white/10 backdrop-blur-lg p-4 text-center text-white border-none">
              <span className="text-4xl font-bold block">{value}</span>
              <span className="text-sm uppercase">{unit}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}