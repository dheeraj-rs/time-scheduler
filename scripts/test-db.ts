import clientPromise from '../lib/db/mongodb'

async function test() {
  try {
    const client = await clientPromise
    console.log('MongoDB connected successfully')
    await client.close()
  } catch (e) {
    console.error('MongoDB connection error:', e)
    process.exit(1)
  }
}

test() 