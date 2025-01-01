"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Schedule() {
  const schedule = [
    {
      time: "09:00 - 10:00",
      title: "Registration & Welcome Coffee",
      type: "BREAK",
      description: "Pick up your conference materials and enjoy morning refreshments"
    },
    {
      time: "10:00 - 11:30",
      title: "Keynote Speech: Future of Computing",
      speaker: "Dr. Sarah Chen",
      type: "TALK",
      description: "An inspiring look at the next decade of computational advances"
    },
    {
      time: "11:30 - 12:00",
      title: "Networking Break",
      type: "BREAK",
      description: "Connect with fellow attendees over refreshments"
    },
    {
      time: "12:00 - 13:00",
      title: "Lunch Session",
      type: "LUNCH",
      description: "Catered lunch with vegetarian and vegan options available"
    },
    {
      time: "13:00 - 14:30",
      title: "Interactive Workshop",
      speaker: "Prof. James Miller",
      type: "TALK",
      description: "Hands-on session with practical applications"
    },
    {
      time: "14:30 - 15:00",
      title: "Afternoon Break",
      type: "BREAK",
      description: "Refresh and recharge"
    },
    {
      time: "15:00 - 16:30",
      title: "Panel Discussion",
      speaker: "Industry Leaders",
      type: "TALK",
      description: "Expert insights and Q&A session"
    },
    {
      time: "16:30 - 17:00",
      title: "Closing Remarks",
      type: "TALK",
      description: "Summary and future directions"
    }
  ];

  return (
    <div className="space-y-4">
      {schedule.map((item, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium">{item.time}</p>
                  <Badge variant={item.type === 'TALK' ? 'default' : 'secondary'}>
                    {item.type}
                  </Badge>
                </div>
                <p className="text-lg font-medium mb-1">{item.title}</p>
                {item.speaker && (
                  <p className="text-sm text-primary mb-2">by {item.speaker}</p>
                )}
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}