'use client'

import { useState } from 'react'
import { Control } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Upload, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { ProgramFormValues } from '@/types/program-form'

interface VenueFieldsProps {
  control: Control<ProgramFormValues>
}

export function VenueFields({ control }: VenueFieldsProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="venue.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Venue Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter venue name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="venue.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Venue Address</FormLabel>
            <FormControl>
              <Input placeholder="Enter venue address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="venue.image"
        render={({ field: { onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Venue Image</FormLabel>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="w-[200px]" asChild>
                <label>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      handleImageUpload(e)
                      const file = e.target.files?.[0]
                      onChange(file)
                    }}
                    ref={field.ref}
                  />
                </label>
              </Button>
              {imagePreview && (
                <div className="relative w-32 h-32">
                  <Image
                    src={imagePreview}
                    alt="Venue preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2"
                    onClick={() => {
                      setImagePreview(null)
                      onChange(null)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
} 