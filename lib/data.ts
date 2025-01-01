import { Hall } from '@/types'

// Sample data - replace with your actual data source
const halls: Hall[] = [
  {
    id: '1',
    name: 'Main Hall',
    address: '123 Main Street',
    capacity: 500,
    description: 'Our largest conference hall',
    imageUrl: '/images/halls/main-hall.jpg'
  },
  {
    id: '2',
    name: 'Executive Hall',
    address: '456 Business Avenue',
    capacity: 200,
    description: 'Perfect for executive meetings',
    imageUrl: '/images/halls/executive-hall.jpg'
  }
]

export async function getHallById(id: string): Promise<Hall | undefined> {
  // Simulate database lookup
  return halls.find(hall => hall.id === id)
} 