import { LandingHero } from '@/components/landing/hero';
import { ProgramList } from '@/components/landing/program-list';
import { LocationGrid } from '@/components/landing/location-grid';
import { ContactSection } from '@/components/landing/contact-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <LandingHero />
      <LocationGrid />
      <ProgramList />
      <ContactSection />
    </main>
  );
}