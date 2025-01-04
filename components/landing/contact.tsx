"use client";

import React from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Contact = () => {
  const MotionLink = motion(Link);
  
  return (
    <motion.footer 
      className="bg-background border-t"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {[
            {
              title: "Company",
              links: [
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ]
            },
            {
              title: "Services",
              links: [
                { href: "/venues", label: "Find Venues" },
                { href: "/venues/list", label: "List Your Venue" }
              ]
            },
            {
              title: "Legal",
              links: [
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" }
              ]
            },
            {
              title: "Connect",
              links: [
                { href: "#", label: "Twitter" },
                { href: "#", label: "LinkedIn" }
              ]
            }
          ].map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <motion.h3 
                className="font-semibold mb-4"
                variants={itemVariants}
              >
                {section.title}
              </motion.h3>
              <motion.ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li key={link.label} variants={itemVariants}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-8 pt-8 border-t text-center text-muted-foreground"
          variants={itemVariants}
        >
          <p>&copy; 2025 Conference. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Contact