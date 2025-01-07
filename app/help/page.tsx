"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  FileQuestion,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

const helpCategories = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics of using our platform",
    articles: [
      "Creating your first event",
      "Venue booking process",
      "Managing registrations",
      "Payment setup guide"
    ]
  },
  {
    icon: FileQuestion,
    title: "FAQs",
    description: "Common questions and answers",
    articles: [
      "Pricing and payments",
      "Cancellation policy",
      "Technical requirements",
      "Security measures"
    ]
  },
  {
    icon: MessageCircle,
    title: "Troubleshooting",
    description: "Solutions to common issues",
    articles: [
      "Booking errors",
      "Payment issues",
      "Account access",
      "Platform compatibility"
    ]
  }
];

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    action: "Send email",
    link: "mailto:support@venue-booking.com"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Available Mon-Fri, 9am-6pm GMT",
    action: "Call now",
    link: "tel:+1234567890"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start chat",
    link: "#"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

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
            className="max-w-4xl mx-auto text-center mb-12"
            variants={itemVariants}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
              Help Center
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to your questions and get the support you need
            </p>
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full"
              startIcon={<Search className="w-4 h-4" />}
            />
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {helpCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <category.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <ul className="space-y-2">
                      {category.articles.map((article) => (
                        <li key={article}>
                          <Link 
                            href="#"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center group/item"
                          >
                            <ChevronRight className="w-4 h-4 mr-2 group-hover/item:text-primary transition-colors" />
                            {article}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-center mb-8">Still need help?</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
              {contactMethods.map((method) => (
                <Card 
                  key={method.title}
                  className="group hover:shadow-lg transition-shadow border-muted-foreground/20"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <method.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {method.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:border-primary/50 transition-colors"
                      asChild
                    >
                      <Link href={method.link} className="flex items-center justify-center">
                        {method.action}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 