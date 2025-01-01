import { Venue } from '@/app/types/venue';

export const venues: Venue[] = [
  {
    id: "1",
    name: "Main Convention Center",
    halls: [
      {
        id: "h1",
        name: "Grand Hall",
        stages: [
          {
            id: "s1",
            name: "Main Stage",
            capacity: 1000,
            facilities: ["Audio System", "Projector", "Stage Lighting"]
          },
          {
            id: "s2",
            name: "Workshop Stage",
            capacity: 200,
            facilities: ["Whiteboard", "Projector"]
          }
        ]
      },
      {
        id: "h2",
        name: "Conference Hall",
        stages: [
          {
            id: "s3",
            name: "Presentation Stage",
            capacity: 500,
            facilities: ["Audio System", "Dual Projectors"]
          }
        ]
      }
    ]
  }
];