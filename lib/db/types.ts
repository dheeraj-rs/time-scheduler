import { ObjectId } from 'mongodb'

export interface Hall {
  _id: ObjectId
  name: string
  description?: string
  capacity: number
  venueId: string
  price: number
  imageUrl?: string
  facilities?: string[]
  dimensions: {
    width: number
    height: number
  }
  stallCategories: {
    id: number
    name: string
    basePrice: number
    color: string
  }[]
  availability?: {
    startDate: Date
    endDate: Date
  }
  createdAt: Date
  updatedAt: Date
} 