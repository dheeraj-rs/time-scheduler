'use client';

import { Button } from '@/components/ui/button';
import { MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Venue } from '@/types/venue';
import type { Hall } from '@/types/hall';
import type { Stall } from '@/types/stall';
import Image from 'next/image';

interface VenueDetailsProps {
  venue: Venue;
  hall: Hall | undefined;
  stalls: Stall[];
}

export default function VenueDetails({ venue, hall, stalls }: VenueDetailsProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/venues"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Venues
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {venue.image && (
              <Image
                src={venue.image}
                alt={venue.name}
                width={800}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg"
                priority
              />
            )}
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>
            <p className="text-muted-foreground mb-6">{venue.description}</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{venue.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Capacity: {venue.capacity} people</span>
              </div>
            </div>

            {venue.amenities && venue.amenities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {venue.amenities.map((amenity, index) => (
                    <span
                      key={`${amenity}-${index}`}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hall && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Hall Information</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">{hall.name}</p>
                  <p className="text-muted-foreground">{hall.description}</p>
                  <p className="mt-2">Capacity: {hall.capacity} people</p>
                  <p className="font-semibold mt-2">Price: AED {hall.price}</p>
                </div>
              </div>
            )}

            {stalls && stalls.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Available Stalls</h3>
                <div className="grid gap-4">
                  {stalls.map((stall) => (
                    <div
                      key={stall.id}
                      className="bg-muted p-4 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{stall.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Size: {typeof stall.size === 'string' ? stall.size : `${stall.size.width}x${stall.size.height}`}
                        </p>
                        <p className="font-semibold">AED {stall.price}</p>
                      </div>
                      <Button
                        onClick={() => router.push(`/venues/${venue.id}/book?stall=${stall.id}`)}
                        disabled={!stall.available}
                      >
                        {stall.available ? 'Book Now' : 'Not Available'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 