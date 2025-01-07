"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Search,
  Code,
  Database,
  Webhook,
  Key,
  Lock,
  Server,
  ChevronRight,
  ArrowRight,
  Terminal
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

const apiCategories = [
  {
    icon: Database,
    title: "Core API",
    description: "Essential endpoints for venue and event management",
    endpoints: [
      {
        method: "GET",
        path: "/api/v1/venues",
        description: "List all available venues",
        tags: ["Venues", "Core"]
      },
      {
        method: "POST",
        path: "/api/v1/bookings",
        description: "Create a new venue booking",
        tags: ["Bookings", "Core"]
      }
    ]
  },
  {
    icon: Webhook,
    title: "Webhooks",
    description: "Real-time event notifications and integrations",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/webhooks",
        description: "Configure webhook endpoints",
        tags: ["Integration", "Webhooks"]
      },
      {
        method: "GET",
        path: "/api/v1/webhook-logs",
        description: "View webhook delivery logs",
        tags: ["Monitoring", "Webhooks"]
      }
    ]
  },
  {
    icon: Key,
    title: "Authentication",
    description: "API authentication and authorization",
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/auth/token",
        description: "Generate API access token",
        tags: ["Auth", "Security"]
      },
      {
        method: "GET",
        path: "/api/v1/auth/keys",
        description: "List API keys",
        tags: ["Auth", "Security"]
      }
    ]
  }
];

const featuredDocs = [
  {
    title: "Quick Start Guide",
    description: "Get started with our API in minutes",
    category: "Getting Started",
    codeExample: `curl -X GET "https://api.venue.com/v1/venues" \\
-H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    title: "Authentication Guide",
    description: "Learn about our authentication methods",
    category: "Security",
    codeExample: `const token = await api.auth.createToken({
  scope: ['venues.read', 'bookings.write']
});`
  }
];

export default function ApiPage() {
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
              API Documentation
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive documentation for our venue booking API
            </p>
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search API documentation..."
              className="w-full"
              startIcon={<Search className="w-4 h-4" />}
            />
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            variants={containerVariants}
          >
            <h2 className="text-2xl font-semibold mb-6">Quick Start</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredDocs.map((doc) => (
                <motion.div
                  key={doc.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-primary/10 text-primary">
                        {doc.category}
                      </Badge>
                      <h3 className="text-xl font-semibold mb-2">{doc.title}</h3>
                      <p className="text-muted-foreground mb-4">{doc.description}</p>
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                        <pre className="whitespace-pre-wrap">{doc.codeExample}</pre>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerVariants}>
            <h2 className="text-2xl font-semibold mb-6">API Reference</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {apiCategories.map((category) => (
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
                  {category.endpoints.map((endpoint) => (
                    <Card
                      key={endpoint.path}
                      className="group hover:shadow-lg transition-shadow border-muted-foreground/20"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant="secondary"
                            className={`${
                              endpoint.method === 'GET' 
                                ? 'bg-blue-500/10 text-blue-500'
                                : 'bg-green-500/10 text-green-500'
                            }`}
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm font-mono group-hover:text-primary transition-colors">
                            {endpoint.path}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {endpoint.description}
                        </p>
                        <div className="flex gap-2">
                          {endpoint.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-primary/10 text-primary text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
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
            <Button variant="outline" className="group" asChild>
              <Link href="/api/reference" className="flex items-center">
                View full API reference
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 