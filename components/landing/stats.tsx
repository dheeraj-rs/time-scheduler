"use client";

import { motion } from 'framer-motion';
import { Calendar, Users, Building2, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

export function Stats() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center hover:shadow-lg transition-shadow border-primary/20">
                  <CardContent className="pt-6">
                    <Icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 