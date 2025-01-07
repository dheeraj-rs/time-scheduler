"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";

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

const sponsors = [
  {
    name: "TechCorp",
    tier: "platinum",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    website: "https://techcorp.com"
  },
  {
    name: "InnovateX",
    tier: "gold",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    website: "https://innovatex.com"
  },
  {
    name: "GlobalTech",
    tier: "gold",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    website: "https://globaltech.com"
  },
  {
    name: "FutureWave",
    tier: "silver",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    website: "https://futurewave.com"
  },
  {
    name: "DataFlow",
    tier: "silver",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Intel_logo_%282020%2C_light_blue%29.svg",
    website: "https://dataflow.com"
  },
  {
    name: "CloudNet",
    tier: "silver",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    website: "https://cloudnet.com"
  }
];

export function Sponsors() {
  return (
    <section className="py-20 relative">
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
            Our Sponsors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proud to be supported by industry leaders
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {sponsors.map((sponsor) => (
            <motion.a
              key={sponsor.name}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-primary/10 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant={sponsor.tier === 'platinum' ? 'default' : 'secondary'}
                    className="text-xs capitalize"
                  >
                    {sponsor.tier}
                  </Badge>
                </div>
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="relative w-24 h-24 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain filter dark:invert"
                      unoptimized
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 