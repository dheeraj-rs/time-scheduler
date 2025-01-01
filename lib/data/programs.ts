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
    }
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
    }
  }
];

export function getProgramById(id: number): Program | undefined {
  return programs.find(program => program.id === id);
}