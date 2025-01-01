export interface StallCategory {
  id: number;
  name: string;
  basePrice: number;
  color: string;
}

export interface Hall {
  id: string|number;
  name: string;
  capacity?: number;
  address?: string;
  description?: string;
  price?: number;
  venueId?: number;
  facilities?: string[];
  venue?: {
    name: string;
    address: string;
  }|string;
  dimensions: {
    width: number;
    height: number;
  };
  stallCategories: Array<{
    id: number;
    name: string;
    basePrice: number;
    color: string;
  }>;
  stages: Array<{
    id: string;
    name: string;
    capacity?: number;
  }>;
}

export interface Stage {
  id: string;
  name: string;
  hallId?: string;
  capacity?: number;
}

export interface Program {
  id: number|string;
  title: string;
  date: Date;
  status: 'live' | 'upcoming' | 'ended';
  hallId: string;
  stageId: string;
  speakers: Array<{
    name: string;
    role: string;
  }>;
  ticketPrice: number;
  sessions: Session[];
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  description?: string;
  currentAttendees?: number;
  maxAttendees?: number;
  categories?: string[];
  venue?: {
    name: string;
    address: string;
  };
  contactInfo?: {
    email: string;
    phone: string;
    website?: string;
  };
}

export interface Session {
  id: string;
  title: string;
  description: string;
  timeSlot: {
    start: Date;
    end: Date;
  };
  speakerId: string;
  speakers: Speaker[];
  stageId: string;
  isBreak: boolean;
  capacity: number;
  ticketsSold: number;
}

export interface Speaker {
  id: string;
  name: string;
  bio: string;
  email: string;
  phone?: string;
  image: string;
  sessions: string[];
  specialGuest: boolean;
  availability: {
    start: Date;
    end: Date;
  }[];
}

export interface Director {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  contact: {
    email: string;
    phone?: string;
  };
}