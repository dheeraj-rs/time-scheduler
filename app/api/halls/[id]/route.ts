import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

// Validation schema for hall data
const hallSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  venueId: z.string().min(1, 'Venue ID is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  facilities: z.array(z.string()).optional(),
  availability: z.object({
    startDate: z.string().datetime().transform(str => new Date(str)),
    endDate: z.string().datetime().transform(str => new Date(str)),
  }).optional(),
})

// GET handler to fetch a specific hall
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const hallId = params.id
    const hall = await db.hall.findUnique({
      where: { id: hallId },
      include: {
        venue: true,
        programs: true,
      },
    })

    if (!hall) {
      return NextResponse.json(
        { error: 'Hall not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(hall)
  } catch (error) {
    console.error('Error fetching hall:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT handler to update a hall
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const hallId = params.id
    const body = await request.json()

    // Validate request body
    const validatedData = hallSchema.parse(body)

    const updatedHall = await db.hall.update({
      where: { id: hallId },
      data: validatedData,
    })

    return NextResponse.json(updatedHall)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating hall:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE handler to remove a hall
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const hallId = params.id

    // Check if hall exists
    const existingHall = await db.hall.findUnique({
      where: { id: hallId },
    })

    if (!existingHall) {
      return NextResponse.json(
        { error: 'Hall not found' },
        { status: 404 }
      )
    }

    // Delete the hall
    await db.hall.delete({
      where: { id: hallId },
    })

    return NextResponse.json(
      { message: 'Hall deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting hall:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH handler for partial updates
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const hallId = params.id
    const body = await request.json()

    // Validate partial update data
    const partialHallSchema = hallSchema.partial()
    const validatedData = partialHallSchema.parse(body)

    const updatedHall = await db.hall.update({
      where: { id: hallId },
      data: validatedData,
    })

    return NextResponse.json(updatedHall)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating hall:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 