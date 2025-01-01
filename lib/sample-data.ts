import { Program, Hall, Speaker } from '@/types/program'

export const samplePrograms: Program[] = [
  {
    id: "1",
    title: "Opening Ceremony",
    date: new Date(),
    status: "upcoming",
    hallId: "hall1",
    stageId: "stage1",
    speakers: [
      {
        name: "John Doe",
        role: "Keynote Speaker"
      }
    ],
    ticketPrice: 99.99,
    sessions: [],
    venue: "Main Hall"
  }
]

export const sampleHalls: Hall[] = [
  {
    id: "hall1",
    name: "Main Conference Hall",
    capacity: 1000,
    stages: [
      {
        id: "stage1",
        name: "Main Stage",
        capacity: 500
      }
    ]
  }
]

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