import { venues } from '@/data/venues'

export async function generateStaticParams() {
  const venueIds = venues.map((venue) => ({
    id: venue.id.toString(),
  }))
  return venueIds
} 