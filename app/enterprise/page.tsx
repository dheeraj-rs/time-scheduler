"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Shield,
  Users,
  Building2,
  Settings,
  Zap,
  LineChart,
  ArrowRight,
  Check,
  Globe,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Advanced security features including SSO, audit logs, and custom data retention policies"
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Granular access controls and role-based permissions for large teams"
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Distributed hosting and CDN for optimal performance worldwide"
  },
  {
    icon: Settings,
    title: "Custom Integration",
    description: "API access and custom integrations with your existing tools"
  },
  {
    icon: LineChart,
    title: "Advanced Analytics",
    description: "Detailed insights and custom reporting for your events"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated account manager and priority technical support"
  }
];

const caseStudies = [
  {
    title: "Global Tech Summit",
    company: "TechCorp International",
    description: "Managed 50+ simultaneous events across 3 continents with 100,000+ attendees",
    metrics: [
      "99.9% uptime",
      "45% cost reduction",
      "4.8/5 attendee satisfaction"
    ]
  },
  {
    title: "Annual Leadership Conference",
    company: "Fortune 500 Financial Services",
    description: "Seamless hybrid events connecting 25,000 employees across 40 countries",
    metrics: [
      "100% security compliance",
      "60% increase in engagement",
      "Zero technical incidents"
    ]
  }
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            variants={itemVariants}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
              Enterprise Solutions
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Powerful tools and dedicated support for large-scale event management
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Contact Sales
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto mb-16"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold text-center mb-8">
              Success Stories
            </h2>
            <div className="space-y-6">
              {caseStudies.map((study) => (
                <motion.div
                  key={study.title}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                      <p className="text-muted-foreground mb-2">{study.company}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {study.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {study.metrics.map((metric, index) => (
                          <div 
                            key={index}
                            className="bg-muted/50 p-3 rounded-lg text-sm text-center"
                          >
                            {metric}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold mb-8">
              Ready to scale your events?
            </h2>
            <div className="flex flex-col items-center gap-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href="/contact" className="flex items-center">
                  Schedule a Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                Our enterprise team will get back to you within 24 hours
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 