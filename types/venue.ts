export interface Stage {
  id: string | number;
  name: string;
  capacity: number;
  facilities: string[];
  programs?: Array<{
    id: string | number;
    name: string;
  }>;
}

export interface Hall {
  id: string | number;
  name: string;
  stages: Stage[];
}

export interface Venue {
  id: number | string;
  name: string;
  halls: Hall[];
  image: string;
  location: string;
  capacity: number;
  description: string;
  amenities: string[];
  price: number;
  address: string;
}