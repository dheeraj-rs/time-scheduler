'use client';

import { Stall } from '@/types/stall';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface StallDetailsProps {
  stall: Stall;
  onBook?: () => void;
}

export function StallDetails({ stall }: StallDetailsProps) {
  const getStatusIcon = () => {
    switch (stall.status) {
      case 'available':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'booked':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'maintenance':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (stall.status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'booked':
        return <Badge className="bg-red-100 text-red-800">Booked</Badge>;
      case 'maintenance':
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Stall {stall.name}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Size</p>
            <p className="font-medium">{stall.size.width}m × {stall.size.height}m</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price per Day</p>
            <p className="font-medium">AED {stall.price}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm text-muted-foreground">
            {stall.status === 'available' ? 'Ready for booking' : 'Not available for booking'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}