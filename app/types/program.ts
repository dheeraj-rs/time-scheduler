export interface Hall {
  id: string;
  name: string;
  capacity: number;
  imageUrl?: string;
  stages: Stage[];
}

export interface Stage {
  id: string;
  name: string;
  hallId: string;
  capacity: number;
}

export interface Program {
  id: string;
  title: string;
  subtitle?: string;
  venue: {
    name: string;
    address: string;
    image?: string;
  };
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  description: string;
  ticketPrice: number;
  sessions: Session[];
  speakers: Speaker[];
  directors: Director[];
  status: 'upcoming' | 'live' | 'ended';
  mainGuests: Speaker[];
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
  };
  categories: string[];
  maxAttendees: number;
  currentAttendees: number;
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