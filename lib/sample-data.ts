import { Hall, Program } from '@/app/types/program'

export const sampleHalls: Hall[] = [
  {
    id: "hall1",
    name: "Main Conference Hall",
    capacity: 1000,
    imageUrl: "/images/halls/main-hall.jpg",
    stages: [
      { id: "stage1", name: "Main Stage", hallId: "hall1", capacity: 500 },
      { id: "stage2", name: "Workshop Area", hallId: "hall1", capacity: 200 },
    ]
  },
  {
    id: "hall2",
    name: "Exhibition Center",
    capacity: 1500,
    imageUrl: "/images/halls/exhibition-hall.jpg",
    stages: [
      { id: "stage3", name: "Expo Stage", hallId: "hall2", capacity: 300 },
      { id: "stage4", name: "Demo Area", hallId: "hall2", capacity: 150 },
    ]
  }
]

export const samplePrograms: Program[] = [
  {
    id: "1",
    title: "Opening Ceremony",
    date: new Date(),
    hallId: "hall1",
    stageId: "stage1",
    description: "Conference opening ceremony with keynote speakers",
    ticketPrice: 99.99,
    status: "upcoming",
    speakers: [
      {
        id: "speaker1",
        name: "John Doe",
        bio: "Keynote Speaker",
        image: "/speakers/john-doe.jpg",
        sessions: ["session1"],
        specialGuest: true,
        email: "john.doe@example.com",
        availability: [
          {
            start: new Date(new Date().setHours(9, 0)),
            end: new Date(new Date().setHours(17, 0))
          }
        ]
      }
    ],
    sessions: [
      {
        id: "session1",
        title: "Welcome Address",
        description: "Opening speech and conference overview",
        timeSlot: {
          start: new Date(new Date().setHours(9, 0)),
          end: new Date(new Date().setHours(10, 0))
        },
        speakerId: "speaker1",
        stageId: "stage1",
        isBreak: false,
        capacity: 500,
        ticketsSold: 0,
        speakers: ["speaker1"]
      }
    ]
  }
  // Add more sample programs as needed
]

export const sampleSpeakers = [
  {
    id: "speaker1",
    name: "John Doe",
    bio: "Keynote Speaker",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    image: "/speakers/john-doe.jpg",
    sessions: ["session1"],
    specialGuest: true,
    availability: [
      {
        start: new Date(new Date().setHours(9, 0)),
        end: new Date(new Date().setHours(17, 0))
      }
    ]
  },
  {
    id: "speaker2",
    name: "Jane Smith",
    bio: "Technical Expert",
    email: "jane.smith@example.com",
    phone: "+1 234 567 8901",
    image: "/speakers/jane-smith.jpg",
    sessions: ["session2"],
    specialGuest: false,
    availability: [
      {
        start: new Date(new Date().setHours(10, 0)),
        end: new Date(new Date().setHours(16, 0))
      }
    ]
  }
]