'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BasicInfoFields } from './form-fields/BasicInfoFields'
import { VenueFields } from './form-fields/VenueFields'
import { GuestsFields } from './form-fields/GuestsFields'
import { ContactFields } from './form-fields/ContactFields'
import { programFormSchema } from '@/lib/validations/program'
import type { Hall } from '@/types'
import { ProgramFormValues } from '@/types/program-form'

interface EditProgramFormProps {
  hall: Hall
}

export function EditProgramForm({ hall }: EditProgramFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      title: '',
      description: '',
      dateRange: {
        from: undefined,
        to: undefined
      },
      venue: {
        name: hall.name,
        address: hall.address
      },
      mainGuests: [],
      contactInfo: {
        email: '',
        phone: '',
        website: ''
      }
    }
  })

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)
      // Add your API call here to update the program
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      toast.success('Program updated successfully')
      router.push('/admin/programs')
    } catch (error) {
      toast.error('Failed to update program')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="venue">Venue Details</TabsTrigger>
              <TabsTrigger value="guests">Main Guests</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicInfoFields control={form.control} />
            </TabsContent>

            <TabsContent value="venue">
              <VenueFields control={form.control} />
            </TabsContent>

            <TabsContent value="guests">
              <GuestsFields control={form.control} />
            </TabsContent>

            <TabsContent value="contact">
              <ContactFields control={form.control} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Program'}
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  )
} 