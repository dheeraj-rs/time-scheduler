import { Hall } from '@/types/venue';

interface Venue {
  id: number;
  name: string;
  location: string;
  address: string;
  capacity: number;
  price: number;
  image: string;
  description: string;
  amenities: string[];
  halls: Hall[];
}

export const venues: Venue[] = [
  {
    id: 1,
    name: 'Grand Exhibition Hall',
    location: 'Dubai Marina',
    address: 'Sheikh Zayed Road, Dubai Marina, Dubai, UAE',
    capacity: 500,
    price: 5000,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800&h=500',
    description: 'A prestigious venue perfect for large exhibitions and corporate events, featuring state-of-the-art facilities and breathtaking marina views.',
    amenities: ['Free Parking', 'Wi-Fi', 'AV Equipment', 'Catering Kitchen', 'Security Service'],
    halls: [],
  },
  {
    id: 2,
    name: 'Business Convention Center',
    location: 'Abu Dhabi Downtown',
    address: 'Hamdan Bin Mohammed Street, Downtown Abu Dhabi, UAE',
    capacity: 300,
    price: 3500,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800&h=500',
    description: 'Modern convention center in the heart of Abu Dhabi, ideal for conferences and business meetings.',
    amenities: ['Business Center', 'Wi-Fi', 'Video Conferencing', 'On-site Parking'],
    halls: [],
  },
  {
    id: 3,
    name: 'Cultural Event Space',
    location: 'Sharjah Cultural District',
    address: 'Al Shuwaihean Area, Heart of Sharjah, UAE',
    capacity: 200,
    price: 2500,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800&h=500',
    description: 'A versatile space perfect for cultural events, art exhibitions, and intimate gatherings.',
    amenities: ['Exhibition Walls', 'Adjustable Lighting', 'Sound System', 'Green Room'],
    halls: [],
  },
  {
    id: 4,
    name: 'Palm Trade Center',
    location: 'Palm Jumeirah',
    address: 'Crescent Road West, Palm Jumeirah, Dubai, UAE',
    capacity: 800,
    price: 8000,
    image: 'https://images.unsplash.com/photo-1600783486189-746b4b189b5e?auto=format&fit=crop&q=80&w=800&h=500',
    description: 'Luxurious waterfront venue with panoramic views, perfect for large-scale exhibitions and international conferences.',
    amenities: ['Valet Parking', 'VIP Lounge', 'Multiple Halls', 'Restaurant', '24/7 Security'],
    halls: [],
  },
  {
    id: 5,
    name: 'Desert Convention Hub',
    location: 'Dubai Silicon Oasis',
    address: 'Dubai Silicon Oasis, Academic City Road, Dubai, UAE',
    capacity: 400,
    price: 4500,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=500',
    description: 'Modern venue with cutting-edge technology integration, suitable for tech conferences and digital exhibitions.',
    amenities: ['High-speed Internet', 'Smart Lighting', 'Tech Support', 'Innovation Lab'],
    halls: [],
  },
  {
    id: 6,
    name: 'Heritage Exhibition Center',
    location: 'Al Ain City Center',
    address: 'Khalifa Bin Zayed Street, Al Ain City Center, Al Ain, UAE',
    capacity: 250,
    price: 3000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=500',
    description: 'Traditional Arabian architecture meets modern amenities in this unique cultural venue.',
    amenities: ['Traditional Majlis', 'Garden Area', 'Prayer Rooms', 'Cultural Tours'],
    halls: [],
  }
];