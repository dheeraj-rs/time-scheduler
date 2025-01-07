"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users,
  ArrowRight,
  Building2,
  GraduationCap,
  Heart
} from 'lucide-react';
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

const departments = [
  "All",
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Operations"
];

const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Dubai, UAE",
    type: "Full-time",
    salary: "$80K - $120K",
    experience: "5+ years",
    description: "We're looking for a Senior Frontend Developer to join our team and help build amazing user experiences.",
    requirements: [
      "Expert in React/Next.js",
      "Strong TypeScript skills",
      "Experience with modern CSS",
      "Understanding of UX principles"
    ]
  },
  {
    id: 2,
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "$70K - $100K",
    experience: "3+ years",
    description: "Join our design team to create beautiful and intuitive interfaces for our products.",
    requirements: [
      "Proficient in Figma",
      "Strong portfolio",
      "Experience with design systems",
      "User research skills"
    ]
  },
  // Add more job listings as needed
];

const benefits = [
  {
    icon: Building2,
    title: "Modern Office",
    description: "State-of-the-art facilities in prime locations"
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "Annual budget for courses and conferences"
  },
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive health and dental coverage"
  },
  {
    icon: Users,
    title: "Great Team",
    description: "Work with talented and passionate individuals"
  }
];

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredJobs = jobListings.filter(job => 
    selectedDepartment === "All" || job.department === selectedDepartment
  );

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
              Join Our Team
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're looking for passionate individuals to help us shape the future of event management
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mb-8 flex flex-wrap gap-3"
            variants={containerVariants}
          >
            {departments.map((dept) => (
              <motion.div
                key={dept}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  onClick={() => setSelectedDepartment(dept)}
                  className="h-9"
                >
                  {dept}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="space-y-6"
            variants={containerVariants}
          >
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-muted-foreground/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="outline" className="bg-primary/5">
                            <Briefcase className="w-3 h-3 mr-1" />
                            {job.department}
                          </Badge>
                          <Badge variant="outline" className="bg-primary/5">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline" className="bg-primary/5">
                            <Clock className="w-3 h-3 mr-1" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className="bg-primary/5">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {job.salary}
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        className="mt-4 md:mt-0 group-hover:bg-primary transition-colors duration-300"
                        asChild
                      >
                        <Link href={`/careers/${job.id}`} className="flex items-center">
                          Apply Now
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {job.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Requirements:</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 