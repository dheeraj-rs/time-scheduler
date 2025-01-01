export interface Program {
  id: number;
  title: string;
  date: Date;
  time: string;
  speakers: string[];
  stage: string;
  tickets: string;
  imageUrl: string;
  description: string;
  venue: {
    name: string;
    address: string;
    facilities: string[];
  };
  category: string;
  status: 'Upcoming' | 'Ongoing' | 'Past';
  ticketPrice: number;
  capacity: number;
  registeredAttendees: number;
  organizer: {
    name: string;
    contact: string;
    email: string;
  };
  schedule: {
    startTime: string;
    endTime: string;
    breakTimes: string[];
  };
  tags: string[];
  featured: boolean;
}

export const programs: Program[] = [
  {
    id: 1,
    title: 'Quantum Computing Symposium',
    date: new Date('2024-07-20'),
    time: '09:00 - 17:00',
    speakers: ['Dr. Sarah Chen', 'Prof. James Miller'],
    stage: 'Main Stage',
    tickets: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80',
    description: 'Join us for a comprehensive exploration of quantum computing advances and applications.',
    venue: {
      name: 'Global Science Center',
      address: '123 Research Ave, Tech City',
      facilities: ['Wi-Fi', 'Parking', 'Cafeteria', 'Recording Equipment']
    },
    category: 'Technology',
    status: 'Upcoming',
    ticketPrice: 499,
    capacity: 500,
    registeredAttendees: 0,
    organizer: {
      name: 'Tech Events International',
      contact: '+1 234 567 8900',
      email: 'events@techevents.com'
    },
    schedule: {
      startTime: '09:00',
      endTime: '17:00',
      breakTimes: ['12:00-13:00', '15:00-15:30']
    },
    tags: ['quantum computing', 'technology', 'research', 'innovation'],
    featured: true
  },
  {
    id: 2,
    title: 'AI in Healthcare Conference',
    date: new Date('2024-08-15'),
    time: '10:00 - 18:00',
    speakers: ['Dr. Michael Brown', 'Dr. Emily Taylor'],
    stage: 'Innovation Theater',
    tickets: 'Limited',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80',
    description: 'Discover the latest applications of AI in modern healthcare.',
    venue: {
      name: 'Medical Research Center',
      address: '456 Health Blvd, Med City',
      facilities: ['Wi-Fi', 'Parking', 'Medical Equipment Demo Area']
    },
    category: 'Healthcare',
    status: 'Upcoming',
    ticketPrice: 599,
    capacity: 300,
    registeredAttendees: 0,
    organizer: {
      name: 'Healthcare Innovation Group',
      contact: '+1 234 567 8901',
      email: 'contact@healthinnovation.com'
    },
    schedule: {
      startTime: '10:00',
      endTime: '18:00',
      breakTimes: ['13:00-14:00', '16:00-16:30']
    },
    tags: ['AI', 'healthcare', 'medical technology', 'innovation'],
    featured: true
  },
  {
    id: 3,
    title: 'Cybersecurity Summit 2024',
    date: new Date('2024-09-05'),
    time: '08:30 - 16:30',
    speakers: ['Prof. Alice Johnson', 'Dr. Robert Chen', 'Mark Williams'],
    stage: 'Security Arena',
    tickets: 'Available',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
    description: 'Expert insights into emerging cyber threats and advanced defense strategies.',
    venue: {
      name: 'Digital Security Institute',
      address: '789 Cyber Lane, Tech Valley',
      facilities: ['Wi-Fi', 'Parking', 'Security Lab', 'Conference Rooms', 'Networking Lounge']
    },
    category: 'Technology',
    status: 'Upcoming',
    ticketPrice: 699,
    capacity: 400,
    registeredAttendees: 0,
    organizer: {
      name: 'Cybersecurity Solutions',
      contact: '+1 234 567 8902',
      email: 'contact@cybersecuritysolutions.com'
    },
    schedule: {
      startTime: '08:30',
      endTime: '16:30',
      breakTimes: ['12:00-13:00', '15:00-15:30']
    },
    tags: ['cybersecurity', 'technology', 'research', 'innovation'],
    featured: false
  },
  {
    id: 4,
    title: 'Renewable Energy Forum',
    date: new Date('2024-10-12'),
    time: '09:30 - 17:30',
    speakers: ['Dr. Maria Garcia', 'Prof. Thomas Green', 'Sarah Anderson'],
    stage: 'Sustainability Hub',
    tickets: 'Limited',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80',
    description: 'Exploring sustainable energy solutions and green technology innovations.',
    venue: {
      name: 'Environmental Research Center',
      address: '321 Green Street, Eco City',
      facilities: ['Solar Powered Facility', 'EV Charging', 'Bio Cafeteria', 'Exhibition Area', 'Workshop Rooms']
    },
    category: 'Environment',
    status: 'Upcoming',
    ticketPrice: 399,
    capacity: 200,
    registeredAttendees: 0,
    organizer: {
      name: 'Environmental Research Group',
      contact: '+1 234 567 8903',
      email: 'contact@environmentalresearch.com'
    },
    schedule: {
      startTime: '09:30',
      endTime: '17:30',
      breakTimes: ['12:00-13:00', '15:00-15:30']
    },
    tags: ['renewable energy', 'environment', 'research', 'innovation'],
    featured: false
  }
];

export function getProgramById(id: number): Program | undefined {
  return programs.find(program => program.id === id);
}