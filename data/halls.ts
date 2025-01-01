import { Hall } from '@/types/hall';

export const halls: Hall[] = [
  {
    id: 1,
    venueId: 1,
    name: 'Main Exhibition Hall',
    description: 'Primary exhibition space with premium locations',
    dimensions: { width: 1200, height: 800 },
    capacity: 500,
    price: 1000,
    facilities: ['WiFi', 'Air Conditioning', 'Security'],
    stallCategories: [
      { id: 1, name: 'Premium', basePrice: 800, color: 'bg-blue-100' },
      { id: 2, name: 'Standard', basePrice: 500, color: 'bg-green-100' },
      { id: 3, name: 'Economy', basePrice: 300, color: 'bg-yellow-100' },
    ],
  },
  {
    id: 2,
    venueId: 1,
    name: 'Innovation Hub',
    description: 'Modern space perfect for tech exhibitions and startups',
    dimensions: { width: 1000, height: 600 },
    capacity: 300,
    price: 750,
    facilities: ['WiFi', 'Air Conditioning'],
    stallCategories: [
      { id: 4, name: 'Premium', basePrice: 700, color: 'bg-blue-100' },
      { id: 5, name: 'Standard', basePrice: 450, color: 'bg-green-100' },
    ],
  },
  {
    id: 3,
    venueId: 2,
    name: 'Conference Hall A',
    description: 'Professional space for business exhibitions and trade shows',
    dimensions: { width: 800, height: 600 },
    capacity: 400,
    price: 600,
    facilities: ['WiFi', 'Air Conditioning'],
    stallCategories: [
      { id: 6, name: 'Premium', basePrice: 600, color: 'bg-blue-100' },
      { id: 7, name: 'Standard', basePrice: 400, color: 'bg-green-100' },
      { id: 8, name: 'Economy', basePrice: 250, color: 'bg-yellow-100' },
    ],
  },
  {
    id: 4,
    venueId: 2,
    name: 'Grand Gallery',
    description: 'Elegant space with high ceilings and natural lighting',
    dimensions: { width: 1500, height: 1000 },
    capacity: 750,
    price: 750,
    facilities: ['WiFi', 'Air Conditioning'],
    stallCategories: [
      { id: 9, name: 'VIP', basePrice: 1000, color: 'bg-purple-100' },
      { id: 10, name: 'Premium', basePrice: 750, color: 'bg-blue-100' },
      { id: 11, name: 'Standard', basePrice: 500, color: 'bg-green-100' },
    ],
  },
  {
    id: 5,
    venueId: 3,
    name: 'Cultural Exhibition Space',
    description: 'Versatile hall perfect for art exhibitions and cultural events',
    dimensions: { width: 900, height: 700 },
    capacity: 550,
    price: 350,
    facilities: ['WiFi', 'Air Conditioning'],
    stallCategories: [
      { id: 12, name: 'Featured', basePrice: 550, color: 'bg-rose-100' },
      { id: 13, name: 'Standard', basePrice: 350, color: 'bg-green-100' },
      { id: 14, name: 'Basic', basePrice: 200, color: 'bg-yellow-100' },
    ],
  }
];