export interface Stall {
  id: string | number;
  name: string;
  description: string;
  image: string;
  size: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
  price: number;
  venueId: number;
  available: boolean;
  categoryId: string | number;
  status: 'available' | 'booked' | 'maintenance';
} 