"use client";
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Calendar, Award } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    {
      icon: Calendar,
      value: "100+",
      label: "Events Organized"
    },
    {
      icon: Users,
      value: "50k+",
      label: "Attendees"
    },
    {
      icon: Building2,
      value: "25+",
      label: "Venues"
    },
    {
      icon: Award,
      value: "15+",
      label: "Years Experience"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-muted-foreground mb-12">
            Leading the way in conference and event management, creating memorable experiences since 2009.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide exceptional conference experiences that inspire, connect, and empower communities through seamless event management and innovative solutions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Expert Planning",
                    description: "Our experienced team ensures every detail is perfectly executed."
                  },
                  {
                    title: "Premium Venues",
                    description: "Access to the most prestigious and well-equipped venues."
                  },
                  {
                    title: "Technical Excellence",
                    description: "State-of-the-art equipment and technical support."
                  },
                  {
                    title: "Dedicated Support",
                    description: "24/7 support throughout your event journey."
                  }
                ].map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="prose prose-gray max-w-none">
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Excellence in every detail</li>
                  <li>Innovation in event solutions</li>
                  <li>Sustainability in our operations</li>
                  <li>Integrity in our relationships</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 