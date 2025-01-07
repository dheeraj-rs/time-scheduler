"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  Search
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Conference Venues in Dubai",
    excerpt: "Discover the most prestigious and well-equipped conference venues across Dubai...",
    date: "March 15, 2024",
    readTime: "5 min read",
    author: "Sarah Johnson",
    category: "Venues",
    tags: ["Dubai", "Luxury Venues", "Corporate Events"],
    image: "/blog/venues-dubai.jpg"
  },
  {
    id: 2,
    title: "Event Planning Checklist for 2024",
    excerpt: "Essential checklist to ensure your conference or event runs smoothly...",
    date: "March 10, 2024",
    readTime: "8 min read",
    author: "Michael Chen",
    category: "Planning",
    tags: ["Event Planning", "Organization", "Tips"],
    image: "/blog/planning-checklist.jpg"
  },
  {
    id: 3,
    title: "Sustainable Event Management Practices",
    excerpt: "Implementing eco-friendly practices in your event planning process...",
    date: "March 5, 2024",
    readTime: "6 min read",
    author: "Emma Wilson",
    category: "Sustainability",
    tags: ["Green Events", "Sustainability", "Best Practices"],
    image: "/blog/sustainable-events.jpg"
  }
];

const categories = [
  "All",
  "Venues",
  "Planning",
  "Technology",
  "Sustainability",
  "Industry News"
];

export default function BlogPage() {
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
              Blog & Insights
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Latest articles, guides, and insights about event management and venue booking
            </p>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search articles..."
                className="flex-1"
                startIcon={<Search className="w-4 h-4" />}
              />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    className="h-9"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto grid gap-6"
            variants={containerVariants}
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          {/* Image placeholder */}
                          <div className="w-full h-full bg-primary/10" />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary"
                              className="bg-primary/10 text-primary"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto mt-8 flex justify-center"
            variants={itemVariants}
          >
            <Button variant="outline" className="group">
              Load more articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 