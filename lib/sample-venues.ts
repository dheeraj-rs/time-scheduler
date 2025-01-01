import { Venue } from '@/types/venue';

export const venues: Venue[] = [
  {
    id: "1",
    name: "Main Convention Center",
    image: "/images/venues/convention-center.jpg",
    location: "Downtown Business District",
    capacity: 2000,
    description: "State-of-the-art convention center with multiple configurable spaces",
    amenities: ["Parking", "WiFi", "Security", "Catering"],
    price: 5000,
    address: "123 Convention Ave, Business District",
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