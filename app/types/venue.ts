export interface Stage {
  id: string;
  name: string;
  capacity: number;
  facilities: string[];
}

export interface Hall {
  id: string;
  name: string;
  stages: Stage[];
}

export interface Venue {
  id: string;
  name: string;
  halls: Hall[];
}