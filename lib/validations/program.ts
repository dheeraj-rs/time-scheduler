import * as z from 'zod'

export const programFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dateRange: z.object({
    from: z.date({
      required_error: 'Start date is required',
    }),
    to: z.date({
      required_error: 'End date is required',
    }),
  }),
  venue: z.object({
    name: z.string().min(1, 'Venue name is required'),
    address: z.string().min(1, 'Venue address is required'),
  }),
  mainGuests: z.array(
    z.object({
      name: z.string().min(1, 'Guest name is required'),
      bio: z.string().optional(),
    })
  ),
  contactInfo: z.object({
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    website: z.string().url('Invalid URL').optional(),
  }),
}) 