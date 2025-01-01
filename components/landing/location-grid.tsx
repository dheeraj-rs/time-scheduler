"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'Main Conference Hall',
    address: '123 Science Ave, Research City',
    capacity: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80',
    description: 'Our flagship venue featuring state-of-the-art presentation equipment and comfortable seating.'
  },
  {
    id: 2,
    name: 'Innovation Theater',
    address: '456 Tech Boulevard, Research City',
    capacity: 500,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    description: 'A modern space perfect for interactive sessions and tech demonstrations.'
  },
  // Add more locations as needed
];

export function LocationGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Venues</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={location.imageUrl}
                  alt={location.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <CardHeader>
                <CardTitle>{location.name}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{location.address}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Capacity: {location.capacity}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{location.description}</p>
                
                <Button variant="outline" className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}