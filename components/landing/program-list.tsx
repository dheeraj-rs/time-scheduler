"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Card, CardContent} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { programs } from '@/lib/data/programs';
import { format } from 'date-fns';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function ProgramList() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Featured Programs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our upcoming events and secure your spot today
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {programs.map((program) => (
            <motion.div
              key={program.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-muted-foreground/20">
                <div className="relative">
                  <div 
                    className="h-40 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${program.imageUrl})` }}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge 
                      variant={program.tickets === 'Limited' ? 'destructive' : 'secondary'}
                      className="backdrop-blur-sm bg-background/80 text-xs"
                    >
                      {program.tickets}
                    </Badge>
                  </div>
                  {program.featured && (
      <div className="absolute -rotate-45 text-xs font-medium py-1 px-6 -left-6 top-4 bg-primary/90 backdrop-blur-md text-primary-foreground shadow-lg">
        Featured
      </div>
    )}
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>

                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span className="truncate">
                        {format(program.date, 'dd MMM yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 text-primary" />
                      <span className="truncate">{program.venue.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-primary font-medium text-sm">
                      AED {program.ticketPrice}
                    </div>
                    <Button size="sm" variant="ghost" className="h-7 px-2 hover:bg-primary/5" asChild>
                      <Link href={`/program/${program.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="text-center mt-12"
        >
          <Button 
            asChild
            className="relative overflow-hidden bg-gradient-to-r from-background/80 to-background hover:from-background/90 hover:to-background/80 text-foreground shadow-lg hover:shadow-xl hover:shadow-foreground/5 transition-all duration-300 group border border-primary/20"
            size="lg"
          >
            <Link 
              href="/program" 
              className="flex items-center gap-2 px-8 py-3 font-medium"
            >
              <span className="relative z-10 text-primary">View All Programs</span>
              <Tag className="w-5 h-5 relative z-10 text-primary group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
