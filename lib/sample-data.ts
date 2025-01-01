// types/program.ts

export interface TimeSlot {
  start: Date;
  end: Date;
}

export interface Stage {
  id: string;
  name: string;
  capacity: number;
}

export interface Hall {
  id: string;
  name: string;
  capacity: number;
  address: string;
  description: string;
  stages: Stage[];
}

export interface Session {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  speakerId: string;
}

export interface Speaker {
  id: string;
  name: string;
  bio: string;
  email: string;
  image: string;
  sessions: string[];
  specialGuest: boolean;
  availability: TimeSlot[];
}

export type ProgramStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Program {
  id: string;
  title: string;
  date: Date;
  status: ProgramStatus;
  hallId: string;
  stageId: string;
  speakers: {
    name: string;
    role: string;
  }[];
  ticketPrice: number;
  sessions: Session[];
  venue?: {
    name: string;
    address: string;
  }|string;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  description?: string;
  currentAttendees?: number;
  maxAttendees?: number;
  categories?: string[];
  contactInfo?: {
    email: string;
    phone: string;
  };
}

export const samplePrograms: Program[] = [
  {
    id: "1",
    title: "Opening Ceremony",
    date: new Date(),
    dateRange: {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1))
    },
    status: "upcoming",
    hallId: "hall1",
    stageId: "stage1",
    description: "Grand opening ceremony of the conference",
    currentAttendees: 0,
    maxAttendees: 100,
    categories: ["Conference", "Opening"],
    speakers: [
      {
        name: "John Doe",
        role: "Keynote Speaker"
      }
    ],
    ticketPrice: 99.99,
    sessions: [],
    venue: {
      name: "Main Hall",
      address: "123 Conference Way"
    },
    contactInfo: {
      email: "contact@conference.com",
      phone: "123-456-7890"
    }
  }
]

export const sampleHalls: Hall[] = [
  {
    id: "hall1",
    name: "Main Conference Hall",
    capacity: 1000,
    currentOccupancy: 750,
    maxOccupancy: 1000,
    address: "Level 1, East Wing",
    description: "Our largest conference space with state-of-the-art facilities",
    imageUrl: "/images/halls/main-hall.jpg",
    facilities: ["WiFi", "Sound System", "Stage Lighting", "Green Room"],
    dimensions: { width: 1000, height: 800 },
    stallCategories: [
      {
        id: "premium",
        name: "Premium",
        basePrice: 2000,
        color: "bg-amber-500"
      },
      {
        id: "standard",
        name: "Standard",
        basePrice: 1000,
        color: "bg-blue-500"
      }
    ],
    stages: [
      {
        id: "stage1",
        name: "Main Stage",
        capacity: 500,
        totalStalls: 50,
        availableStalls: 20
      },
      {
        id: "stage2",
        name: "Secondary Stage",
        capacity: 300,
        totalStalls: 30,
        availableStalls: 15
      }
    ],
    currentPrograms: [
      {
        id: 1,
        name: "Tech Summit 2024",
        stage: "Main Stage",
        attendees: 280,
        capacity: 300,
        startTime: "09:00 AM",
        endTime: "05:00 PM"
      },
      {
        id: 2,
        name: "Startup Showcase",
        stage: "Secondary Stage",
        attendees: 150,
        capacity: 200,
        startTime: "02:00 PM",
        endTime: "06:00 PM"
      }
    ]
  },
  {
    id: "hall2",
    name: "Innovation Hub",
    capacity: 500,
    currentOccupancy: 320,
    maxOccupancy: 500,
    address: "Level 2, West Wing",
    description: "Modern space perfect for tech events and workshops",
    imageUrl: "/images/halls/innovation-hub.jpg",
    facilities: ["High-Speed Internet", "Interactive Displays", "Breakout Rooms"],
    dimensions: { width: 800, height: 600 },
    stallCategories: [
      {
        id: "premium2",
        name: "Premium Plus",
        basePrice: 1500,
        color: "bg-purple-500"
      },
      {
        id: "standard2",
        name: "Regular",
        basePrice: 800,
        color: "bg-green-500"
      }
    ],
    stages: [
      {
        id: "stage3",
        name: "Innovation Stage",
        capacity: 200,
        totalStalls: 30,
        availableStalls: 10
      }
    ],
    currentPrograms: [
      {
        id: 3,
        name: "AI Workshop",
        stage: "Innovation Stage",
        attendees: 180,
        capacity: 200,
        startTime: "10:00 AM",
        endTime: "04:00 PM"
      }
    ]
  },
  {
    id: "hall3",
    name: "Exhibition Center",
    capacity: 1500,
    currentOccupancy: 1100,
    maxOccupancy: 1500,
    address: "Ground Floor, North Wing",
    description: "Expansive space for large exhibitions and trade shows",
    imageUrl: "/images/halls/exhibition-center.jpg",
    facilities: ["Loading Dock", "Heavy Power Supply", "Multiple Entrances"],
    dimensions: { width: 1200, height: 1000 },
    stallCategories: [
      {
        id: "premium3",
        name: "Premium Corner",
        basePrice: 3000,
        color: "bg-red-500"
      },
      {
        id: "standard3",
        name: "Standard Booth",
        basePrice: 1500,
        color: "bg-cyan-500"
      },
      {
        id: "basic3",
        name: "Basic Space",
        basePrice: 800,
        color: "bg-yellow-500"
      }
    ],
    stages: [
      {
        id: "stage4",
        name: "Main Exhibition Stage",
        capacity: 800,
        totalStalls: 100,
        availableStalls: 35
      },
      {
        id: "stage5",
        name: "Demo Stage",
        capacity: 200,
        totalStalls: 40,
        availableStalls: 15
      }
    ],
    currentPrograms: [
      {
        id: 4,
        name: "Trade Expo 2024",
        stage: "Main Exhibition Stage",
        attendees: 750,
        capacity: 800,
        startTime: "08:00 AM",
        endTime: "08:00 PM"
      }
    ]
  }
];

export const sampleSpeakers: Speaker[] = [
  {
    id: "speaker1",
    name: "Dr. Sarah Chen",
    bio: "Leading expert in quantum computing",
    email: "sarah.chen@example.com",
    image: "/images/speakers/sarah-chen.jpg",
    sessions: ["session1"],
    specialGuest: true,
    availability: [
      {
        start: new Date("2024-03-15T09:00:00"),
        end: new Date("2024-03-15T17:00:00")
      }
    ]
  },
  {
    id: "speaker2",
    name: "Prof. James Miller",
    bio: "Distinguished researcher in AI",
    email: "james.miller@example.com",
    image: "/images/speakers/james-miller.jpg",
    sessions: ["session2"],
    specialGuest: false,
    availability: [
      {
        start: new Date("2024-03-16T09:00:00"),
        end: new Date("2024-03-16T17:00:00")
      }
    ]
  }
]