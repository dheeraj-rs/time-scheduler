import React from 'react'
import { Calendar, MapPin, Users } from 'lucide-react';

function Chooseus() {
  return (
    <section className="py-20 bg-muted/50">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Multiple Locations</h3>
          <p className="text-muted-foreground">
            Find venues across UAE with detailed information and virtual tours
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-time Booking</h3>
          <p className="text-muted-foreground">
            Check availability and book instantly with our real-time system
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Vendor Dashboard</h3>
          <p className="text-muted-foreground">
            Manage your venues, bookings, and analytics all in one place
          </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Chooseus