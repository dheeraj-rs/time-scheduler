'use client';

import { useState } from 'react';
import { Venue } from '@/types/venue';
import { Hall } from '@/types/hall';
import { Stall } from '@/types/stall';
import { HallGrid } from '@/components/venue/hall-grid';
import { BookingForm } from '@/components/venue/booking-form';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Building2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface BookingContentProps {
  venue: Venue;
  hall: Hall;
  stalls: Stall[];
}

export default function BookingContent({ venue, hall, stalls }: BookingContentProps) {
  const [selectedStall, setSelectedStall] = useState<Stall | null>(null);

  const handleStallSelect = (stall: Stall) => {
    setSelectedStall(stall);
  };

  const handleBookingSubmit = async (startDate: Date, endDate: Date) => {
    try {
      console.log('Booking submitted:', { selectedStall, startDate, endDate });
      toast({
        title: "Booking Submitted",
        description: "Your booking request has been submitted successfully.",
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href={`/venues/${venue.id}`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Venue Details
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <h1 className="text-3xl font-bold">{hall.name}</h1>
              </div>
              <p className="text-muted-foreground">{hall.description}</p>
            </div>
            
            <HallGrid
              hall={hall}
              stalls={stalls}
              onStallSelect={handleStallSelect}
              selectedStall={selectedStall}
            />
          </div>

          <div>
            <div className="sticky top-8 space-y-6">
              <h2 className="text-2xl font-semibold">Booking Details</h2>
              {selectedStall ? (
                <BookingForm
                  stall={selectedStall}
                  onSubmit={handleBookingSubmit}
                />
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="bg-muted rounded-full p-4 w-16 h-16 mx-auto">
                        <Building2 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Select a Stall</h3>
                        <p className="text-sm text-muted-foreground">
                          Click on an available stall in the layout to view details and make a booking
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 