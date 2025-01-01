'use client'

import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProgramFormValues } from '@/types/program-form'

interface GuestsFieldsProps {
  control: Control<ProgramFormValues>
}

export function GuestsFields({ control }: GuestsFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="mainGuests.0.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Guest Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter guest name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
} 