export interface ProgramFormValues {
  title: string;
  description: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  venue: {
    name: string;
    address: string;
    image: File | null;
  };
  mainGuests: Array<{
    name: string;
    bio?: string;
  }>;
  contactInfo: {
    email: string;
    phone: string;
    website: string;
  };
} 