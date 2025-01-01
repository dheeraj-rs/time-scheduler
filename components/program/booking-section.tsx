"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Program } from '@/lib/data/programs'

interface BookingSectionProps {
  program: Program;
}

export function BookingSection({ program }: BookingSectionProps) {
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketType, setTicketType] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  const ticketTypes = {
    standard: { 
      price: program.ticketPrice, 
      name: 'Standard', 
      description: 'Access to all regular sessions' 
    },
    vip: { 
      price: program.ticketPrice * 2, 
      name: 'VIP', 
      description: 'Priority seating, exclusive networking events' 
    },
    student: { 
      price: program.ticketPrice * 0.5, 
      name: 'Student', 
      description: 'Valid student ID required' 
    }
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Booking confirmed! Check your email for details.');
    setIsProcessing(false);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Book Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Ticket Type</label>
            <Select value={ticketType} onValueChange={setTicketType}>
              <SelectTrigger>
                <SelectValue placeholder="Select ticket type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ticketTypes).map(([key, { name, description }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex flex-col">
                      <span>{name}</span>
                      <span className="text-xs text-muted-foreground">{description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Number of Tickets</label>
            <Input 
              type="number" 
              min="1"
              max="10"
              value={ticketCount}
              onChange={(e) => setTicketCount(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
            />
            <p className="text-xs text-muted-foreground mt-1">Maximum 10 tickets per booking</p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price per ticket</span>
              <span>${ticketTypes[ticketType as keyof typeof ticketTypes].price}</span>
            </div>
            {ticketCount > 1 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal ({ticketCount} tickets)</span>
                <span>${ticketTypes[ticketType as keyof typeof ticketTypes].price * ticketCount}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span>${ticketTypes[ticketType as keyof typeof ticketTypes].price * ticketCount}</span>
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handleBooking}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            By proceeding, you agree to our terms and conditions
          </p>
        </div>
      </CardContent>
    </Card>
  );
}