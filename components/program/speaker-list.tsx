"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SpeakerListProps {
  speakers: string[];
}

export function SpeakerList({ speakers }: SpeakerListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {speakers.map((speaker, index) => (
        <Card key={index}>
          <CardContent className="flex items-center gap-4 p-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://i.pravatar.cc/150?u=${speaker}`} />
              <AvatarFallback>{speaker.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{speaker}</p>
              <p className="text-sm text-muted-foreground">Speaker Bio</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}