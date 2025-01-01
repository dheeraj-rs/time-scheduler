"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { toast } from "sonner";

// Reference the styling from:
// components/landing/hero.tsx (lines 50-92)
// components/program/booking-section.tsx (lines 35-103)

const ticketTypes = [
  {
    id: 'vip',
    name: 'VIP Access',
    price: 499,
    description: 'Priority seating, exclusive networking events, VIP lounge access',
    perks: ['Reserved front-row seating', 'VIP networking reception', 'Exclusive workshop access']
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 299,
    description: 'Full conference access with all regular sessions',
    perks: ['General seating', 'All regular sessions', 'Lunch included']
  },
  {
    id: 'virtual',
    name: 'Virtual Pass',
    price: 149,
    description: 'Stream all sessions live from anywhere',
    perks: ['Live stream access', 'Digital resources', '30-day replay access']
  }
];

export default function TicketsPage() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Tickets booked successfully! Check your email for confirmation.');
    setIsProcessing(false);
  };

  const selectedTicket = ticketTypes.find(t => t.id === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Conference Tickets 2024
            </h1>
            <div className="flex items-center justify-center gap-6 mt-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{format(new Date('2024-06-15'), 'dd MMM yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Dubai International Convention Center</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {ticketTypes.map((ticket) => (
              <Card 
                key={ticket.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  selectedType === ticket.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedType(ticket.id)}
              >
                <CardHeader>
                  <CardTitle>{ticket.name}</CardTitle>
                  <p className="text-2xl font-bold text-primary">
                    AED {ticket.price}
                  </p>
                  <p className="text-sm text-muted-foreground">{ticket.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {ticket.perks.map((perk, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">✓</span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedType && (
            <Card className="max-w-xl mx-auto">
              <CardHeader>
                <CardTitle>Complete Your Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Number of Tickets</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="max-w-[150px]"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Maximum 10 tickets per transaction</p>
                    </div>

                    <div className="space-y-4 pt-4">
                      <Label>Contact Information</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="First Name" required />
                        <Input placeholder="Last Name" required />
                      </div>
                      <Input type="email" placeholder="Email Address" required />
                      <Input placeholder="Phone Number" required />
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ticket Price</span>
                        <span>AED {selectedTicket?.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Quantity</span>
                        <span>× {quantity}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total Amount</span>
                        <span className="text-primary">AED {(selectedTicket?.price || 0) * quantity}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Proceed to Payment
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By proceeding, you agree to our terms and conditions
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 