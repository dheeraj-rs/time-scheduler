"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Director, TechCorp",
    image: "/avatars/sarah.jpg",
    quote: "The conference platform transformed how we manage our tech events. Seamless experience from start to finish."
  },
  {
    name: "Michael Chen",
    role: "Conference Organizer",
    image: "/avatars/michael.jpg",
    quote: "Outstanding venue options and professional support team. Made our international conference a huge success."
  },
  {
    name: "Emma Davis",
    role: "Marketing Manager",
    image: "/avatars/emma.jpg",
    quote: "The analytics and engagement features helped us deliver better value to our sponsors and attendees."
  }
];

export function Testimonials() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from event organizers who&apos;ve transformed their conferences with our platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-6">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 