import { Metadata } from 'next';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { programs } from '@/lib/data/programs';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'All Programs',
  description: 'Browse all available programs and events',
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Programs</h1>
          <p className="text-muted-foreground">
            Discover and book your next event from our comprehensive program listings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card 
              key={program.id} 
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-muted-foreground/20 relative"
            >
              <div className="relative">
                <div 
                  className="h-52 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${program.imageUrl})` }}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge 
                    variant={program.tickets === 'Limited' ? 'destructive' : 'secondary'}
                    className="backdrop-blur-sm bg-background/80"
                  >
                    {program.tickets}
                  </Badge>
                  {program.featured && (
                    <Badge 
                      variant="default"
                      className="backdrop-blur-sm bg-primary/80"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">
                  {program.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {program.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">
                      {format(program.date, 'dd MMM yyyy')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">{program.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">{program.venue.name}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <div className="font-semibold text-primary text-lg">
                      AED {program.ticketPrice}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {program.registeredAttendees}/{program.capacity} registered
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/program/${program.id}`}>Details</Link>
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                      <Link href={`/program/${program.id}/tickets`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}