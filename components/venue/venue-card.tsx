'use client';

import { Venue } from '@/types/venue';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
          <Image
            src={venue.image}
            alt={venue.name}
            className="object-cover w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{venue.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{venue.description}</p>
        <Button asChild className="w-full">
          <Link href={`/venues/${venue.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}