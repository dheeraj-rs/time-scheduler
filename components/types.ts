export interface Seat {
  id: number;
  row: string;
  number: number;
  type: 'regular' | 'premium' | 'recliner';
  status: 'available' | 'sold' | 'selected';
}

export interface TheaterLayoutProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
  selectedSeats?: Seat[];
  showTime: string;
  screenName: string;
} 