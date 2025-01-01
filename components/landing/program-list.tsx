"use client";

import Link from 'next/link';
import { Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { programs } from '@/lib/data/programs';
import { format } from 'date-fns';

export function ProgramList() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Upcoming Programs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${program.imageUrl})` }}
              />
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <Badge variant={program.tickets === 'Limited' ? 'destructive' : 'secondary'}>
                    {program.tickets}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
              <div className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
  <Calendar className="w-4 h-4" />
  <span>{format(program.date, 'dd/MM/yyyy')}</span>
  <Clock className="w-4 h-4 ml-4" />
  <span>{program.time}</span>
</div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{program.speakers.join(', ')}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">{program.description}</p>
                  
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-muted-foreground">{program.stage}</span>
                    <div className="space-x-2">
                      <Button variant="outline" asChild>
                        <Link href={`/program/${program.id}`}>View Details</Link>
                      </Button>
                      <Button asChild>
                        <Link href={`/program/${program.id}#booking`}>Book Tickets</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}