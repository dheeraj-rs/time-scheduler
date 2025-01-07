"use client";

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

function Chooseus() {
  return (
    <motion.section 
      className="py-20 bg-muted/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          variants={itemVariants}
        >
          Why Choose Us
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: MapPin,
              title: "Multiple Locations",
              description: "Find venues across UAE with detailed information and virtual tours"
            },
            {
              icon: Calendar,
              title: "Real-time Booking",
              description: "Check availability and book instantly with our real-time system"
            },
            {
              icon: Users,
              title: "Vendor Dashboard",
              description: "Manage your venues, bookings, and analytics all in one place"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              <motion.div 
                className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="h-8 w-8 text-primary" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Chooseus;