import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Users, MapPin, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { programs } from '@/lib/data/programs';
import { Schedule } from '@/components/program/schedule';
import { SpeakerList } from '@/components/program/speaker-list';
import { BookingSection } from '@/components/program/booking-section';
import { getProgramById } from '@/lib/data/programs';

interface Props {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return programs.map((program) => ({
    id: program.id.toString(),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const program = getProgramById(parseInt(params.id));
  
  if (!program) {
    return {
      title: 'Program Not Found',
    };
  }

  return {
    title: program.title,
    description: program.description,
  };
}

export default function ProgramDetails({ params }: Props) {
  const program = getProgramById(parseInt(params.id));

  if (!program) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <div 
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${program.imageUrl})` }}
            />
            <CardHeader>
              <CardTitle className="text-3xl">{program.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span>{program.date.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>{program.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>{program.stage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-muted-foreground" />
                  <span>{program.tickets}</span>
                </div>
              </div>

              <Tabs defaultValue="schedule">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                  <TabsTrigger value="venue">Venue</TabsTrigger>
                </TabsList>
                <TabsContent value="schedule">
                  <Schedule programId={program.id} />
                </TabsContent>
                <TabsContent value="speakers">
                  <SpeakerList speakers={program.speakers} />
                </TabsContent>
                <TabsContent value="venue">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{program.venue.name}</h3>
                    <p className="text-muted-foreground">{program.venue.address}</p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Facilities</h4>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {program.venue.facilities.map((facility, index) => (
                          <li key={index}>{facility}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <BookingSection program={program} />
        </div>
      </div>
    </div>
  );
}