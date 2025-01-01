import { venues } from '@/data/venues';
import { halls } from '@/data/halls';
import { stalls } from '@/data/stalls';
import { notFound } from 'next/navigation';
import VenueDetails from './VenueDetails';

export async function generateStaticParams() {
  return venues.map((venue) => ({
    id: venue.id.toString(),
  }));
}

export default async function VenuePage({ params }: { params: { id: string } }) {
  const venue = venues.find((v) => v.id.toString() === params.id);
  
  if (!venue) {
    notFound();
  }

  const hall = halls.find((h) => h.venueId === venue.id);
  const venueStalls = stalls.filter((s) => s.venueId === venue.id);

  return <VenueDetails venue={venue} hall={hall} stalls={venueStalls} />;
}