"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Shield, Settings, Info, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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

const cookieCategories = [
  {
    icon: Cookie,
    title: "Essential Cookies",
    description: "These cookies are necessary for the website to function and cannot be switched off.",
    required: true,
    examples: [
      "Session management",
      "Load balancing",
      "Security tokens",
      "User preferences"
    ]
  },
  {
    icon: Shield,
    title: "Analytics Cookies",
    description: "Help us understand how visitors interact with our website.",
    required: false,
    examples: [
      "Page view statistics",
      "User behavior tracking",
      "Performance monitoring",
      "Traffic sources"
    ]
  },
  {
    icon: Settings,
    title: "Functional Cookies",
    description: "Enable enhanced functionality and personalization.",
    required: false,
    examples: [
      "Language preferences",
      "Location settings",
      "Customized content",
      "Remember user choices"
    ]
  }
];

export default function CookiesPage() {
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
              Cookie Policy
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Understanding how and why we use cookies to improve your experience
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            variants={itemVariants}
          >
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">What Are Cookies?</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They help us provide you with a better experience by:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Remembering your preferences and settings</li>
                  <li>Understanding how you use our website</li>
                  <li>Improving website performance and security</li>
                  <li>Providing personalized content and features</li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {cookieCategories.map((category) => (
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
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{category.title}</h3>
                        {category.required && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-2">Examples:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {category.examples.map((example, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
                <p className="text-muted-foreground mb-4">
                  You can manage your cookie preferences through your browser settings. 
                  Please note that disabling certain cookies may affect the functionality of our website.
                </p>
                <Button variant="outline" className="group" asChild>
                  <Link href="/privacy" className="flex items-center">
                    Learn more about our Privacy Policy
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 