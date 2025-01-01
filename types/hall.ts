export interface StallCategory {
  id: number | string;
  name: string;
  basePrice: number;
  color: string;
}

export interface Hall {
  id: number;
  name: string;
  description: string;
  capacity: number;
  price: number;
  venueId: number;
  facilities: string[];
  imageUrl?: string;
  dimensions: {
    width: number;
    height: number;
  };
  stallCategories: StallCategory[];
}

export interface HallWithDetails extends Hall {
  stages: {
    id: string
    name: string
    totalStalls: number
    availableStalls: number
  }[]
  currentPrograms: {
    id: string
    name: string
    stage: string
    attendees: number
    capacity: number
  }[]
} 