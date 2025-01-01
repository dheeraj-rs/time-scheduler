import Header from '@/components/landing/header';
import { LandingHero } from '@/components/landing/hero';
import { ProgramList } from '@/components/landing/program-list';
import Chooseus from '@/components/landing/choose-us';
import Contact from '@/components/landing/contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header/>
      <LandingHero />
      <ProgramList />
      <Chooseus/>
      <Contact/>
    </main>
  );
}