import clientPromise from '../lib/db/mongodb'

async function testConnection() {
  try {
    const client = await clientPromise
    await client.db().command({ ping: 1 })
    console.log('Successfully connected to MongoDB')
    await client.close()
    process.exit(0)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

testConnection() 