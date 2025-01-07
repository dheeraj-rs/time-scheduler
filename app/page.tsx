import Header from '@/components/landing/header';
import { LandingHero } from '@/components/landing/hero';
import { ProgramList } from '@/components/landing/program-list';
import Chooseus from '@/components/landing/choose-us';
import Contact from '@/components/landing/contact';
import { Stats } from '@/components/landing/stats';
import { Testimonials } from '@/components/landing/testimonials';
import { Sponsors } from '@/components/landing/sponsors';
// import { EventBackgroundEffects } from '@/components/landing/event-background-effects';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* <EventBackgroundEffects />       */}
      <div className="content-layer">
        <Header />
        <LandingHero />
        <div className="hero-program-merge">
          <div className="section-transition">
            <ProgramList />
          </div>
        </div>
        <div className="section-transition">
          <Chooseus />
        </div>
        <div className="section-transition">
          <Stats />
        </div>
        <div className="section-transition">
          <Testimonials />
        </div>
        <div className="section-transition">
          <Sponsors />
        </div>
        <div className="section-transition">
          <Contact />
        </div>
      </div>
    </main>
  );
}