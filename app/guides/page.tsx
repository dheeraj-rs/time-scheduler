"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Search,
  Book,
  Calendar,
  Users,
  Settings,
  Building2,
  ChevronRight,
  Clock,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const guideCategories = [
  {
    icon: Calendar,
    title: "Event Planning",
    description: "Comprehensive guides for planning successful events",
    guides: [
      {
        title: "Event Planning Timeline",
        description: "Step-by-step timeline for organizing your event",
        readTime: "10 min read",
        tags: ["Planning", "Organization"]
      },
      {
        title: "Venue Selection Guide",
        description: "How to choose the perfect venue for your event",
        readTime: "8 min read",
        tags: ["Venues", "Selection"]
      }
    ]
  },
  {
    icon: Users,
    title: "Attendee Management",
    description: "Best practices for managing event attendees",
    guides: [
      {
        title: "Registration Process",
        description: "Streamline your event registration workflow",
        readTime: "7 min read",
        tags: ["Registration", "Workflow"]
      },
      {
        title: "Engagement Strategies",
        description: "Keep attendees engaged before and during events",
        readTime: "12 min read",
        tags: ["Engagement", "Strategy"]
      }
    ]
  },
  {
    icon: Settings,
    title: "Technical Setup",
    description: "Technical guides for event infrastructure",
    guides: [
      {
        title: "AV Equipment Setup",
        description: "Essential audio-visual setup guidelines",
        readTime: "15 min read",
        tags: ["Technical", "Equipment"]
      },
      {
        title: "Virtual Event Tools",
        description: "Guide to virtual and hybrid event platforms",
        readTime: "10 min read",
        tags: ["Virtual", "Technology"]
      }
    ]
  }
];

const featuredGuides = [
  {
    title: "Complete Event Planning Handbook",
    description: "A comprehensive guide covering all aspects of event planning",
    readTime: "25 min read",
    category: "Featured",
    image: "/guides/handbook.jpg"
  },
  {
    title: "Sustainable Event Management",
    description: "Best practices for organizing environmentally conscious events",
    readTime: "20 min read",
    category: "Featured",
    image: "/guides/sustainable.jpg"
  }
];

export default function GuidesPage() {
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
              Event Planning Guides
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive resources to help you plan and execute successful events
            </p>
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full"
              startIcon={<Search className="w-4 h-4" />}
            />
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            variants={containerVariants}
          >
            <h2 className="text-2xl font-semibold mb-6">Featured Guides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredGuides.map((guide) => (
                <motion.div
                  key={guide.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                        <div className="w-full h-full bg-primary/10" />
                      </div>
                      <Badge className="mb-2 bg-primary/10 text-primary">
                        {guide.category}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                      <p className="text-muted-foreground mb-4">{guide.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {guide.readTime}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerVariants}>
            <h2 className="text-2xl font-semibold mb-6">All Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {guideCategories.map((category) => (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  {category.guides.map((guide) => (
                    <Card
                      key={guide.title}
                      className="group hover:shadow-lg transition-shadow border-muted-foreground/20"
                    >
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {guide.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {guide.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {guide.readTime}
                          </div>
                          <div className="flex gap-2">
                            {guide.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-primary/10 text-primary text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto mt-12 text-center"
            variants={itemVariants}
          >
            <Button variant="outline" className="group">
              Load more guides
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 