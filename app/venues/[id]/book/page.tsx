import { venues } from '@/data/venues';
import { halls } from '@/data/halls';
import { stalls } from '@/data/stalls';
import { notFound } from 'next/navigation';
import BookingContent from './BookingContent';
import { Venue } from '@/types/venue';
export default function BookVenuePage({
  params,
}: {
  params: { id: string };
}) {
  const venueId = parseInt(params.id, 10);
  
  if (isNaN(venueId)) {
    notFound();
  }

  const venue = venues.find((v) => v.id === venueId);
  const hall = halls.find((h) => h.venueId === venue?.id);
  const venueStalls = stalls.filter((s) => s.venueId === venue?.id);

  if (!venue || !hall) {
    notFound();
  }

  return (
    <BookingContent 
      venue={venue as Venue}
      hall={hall}
      stalls={venueStalls}
    />
  );
}