"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

// Mock data - Replace with your actual data structure
const bookedVenues = [
  {
    id: 1,
    name: "Grand Conference Hall",
    bookingDate: "2024-04-15",
    eventDate: "2024-05-20",
    capacity: 500,
    status: "Confirmed",
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1450",
    location: "Downtown Business District",
    timeSlot: "09:00 - 17:00",
    bookingRef: "BK-2024-001",
    price: 5000
  },
  // Add more venues as needed
];

export default function ListVenuePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVenues = bookedVenues.filter(venue => 
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button - Referenced from VenueDetails.tsx */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Venues
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Booked Venues</h1>
            <p className="text-muted-foreground mt-2">
              Manage and view your venue bookings
            </p>
          </div>
          <Button asChild>
            <Link href="/venues">Book New Venue</Link>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <Card 
              key={venue.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <div className="relative h-48 w-full">
                  <Image 
                    src={venue.imageUrl}
                    alt={venue.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={venue.status === 'Confirmed' ? 'default' : 'secondary'}
                    className="backdrop-blur-sm bg-background/80"
                  >
                    {venue.status}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {venue.name}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">
                      {new Date(venue.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">{venue.timeSlot}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">{venue.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">Capacity: {venue.capacity}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <div className="font-semibold text-primary text-lg">
                      AED {venue.price}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Ref: {venue.bookingRef}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/venues/bookings/${venue.id}`}>Details</Link>
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <Link href={`/venues/bookings/${venue.id}/manage`}>Manage</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 