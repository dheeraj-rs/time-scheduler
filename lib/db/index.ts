import clientPromise from './mongodb'
import { Hall } from './types'
import { ObjectId } from 'mongodb'

export const db = {
  hall: {
    findUnique: async (query: { 
      where: { id: string }, 
      include?: { venue?: boolean, programs?: boolean } 
    }) => {
      const client = await clientPromise
      const collection = client.db().collection<Hall>('halls')
      return collection.findOne({ _id: new ObjectId(query.where.id) })
    },

    update: async (query: { where: { id: string }, data: Partial<Hall> }) => {
      const client = await clientPromise
      const collection = client.db().collection<Hall>('halls')
      const { ...updateData } = query.data
      
      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(query.where.id) },
        { 
          $set: { 
            ...updateData,
            updatedAt: new Date()
          } 
        },
        { returnDocument: 'after' }
      )
      
      return result ?? null
    },

    delete: async (query: { where: { id: string } }) => {
      const client = await clientPromise
      const collection = client.db().collection<Hall>('halls')
      await collection.deleteOne({ _id: new ObjectId(query.where.id) })
    }
  }
} 