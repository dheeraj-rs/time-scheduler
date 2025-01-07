"use client";

import React from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion';
import {  Twitter, Linkedin, Facebook, Instagram, ExternalLink } from 'lucide-react';

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

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    scale: 1.2,
    rotate: 15,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" }
];

const Contact = () => {
  return (
    <motion.footer 
      className="relative py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
      
      <div className="relative container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Stay Connected
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community and stay updated with the latest events and announcements
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
        >
          {[
            {
              title: "Company",
              links: [
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/careers", label: "Careers" },
                { href: "/press", label: "Press Kit" }
              ]
            },
            {
              title: "Services",
              links: [
                { href: "/venues", label: "Find Venues" },
                { href: "/venues/list", label: "List Your Venue" },
                { href: "/pricing", label: "Pricing" },
                { href: "/enterprise", label: "Enterprise" }
              ]
            },
            {
              title: "Legal",
              links: [
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/cookies", label: "Cookie Policy" },
                { href: "/compliance", label: "Compliance" }
              ]
            },
            {
              title: "Resources",
              links: [
                { href: "/blog", label: "Blog" },
                { href: "/help", label: "Help Center" },
                { href: "/guides", label: "Guides" },
                { href: "/api", label: "API Docs" }
              ]
            }
          ].map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <motion.h3 
                className="font-semibold mb-4 text-lg"
                variants={itemVariants}
              >
                {section.title}
              </motion.h3>
              <motion.ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li key={link.label} variants={itemVariants}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
<div className="section-transition"/>
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center pt-8"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} Conference. All rights reserved.
            </p>
          </motion.div>

          <motion.div 
            className="flex space-x-4"
            variants={containerVariants}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                variants={iconVariants}
                whileHover="hover"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Contact;