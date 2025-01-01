export interface Hall {
  id: string;
  name: string;
  capacity: number;
  imageUrl?: string;
  address: string;
  description: string;
  stages: Array<{
    id: string;
    name: string;
    capacity: number;
  }>;
}

export interface Stage {
  id: string;
  name: string;
  hallId: string;
  capacity: number;
}

export interface Program {
  id: number;
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
  venue: string;
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