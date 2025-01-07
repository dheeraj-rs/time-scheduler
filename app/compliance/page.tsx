"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Shield,
  CheckCircle2,
  FileCheck,
  Lock,
  Building2,
  Globe,
  ArrowRight
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

const complianceFrameworks = [
  {
    icon: Shield,
    title: "GDPR Compliance",
    description: "Full compliance with EU data protection regulations",
    badges: ["Data Protection", "EU"],
    points: [
      "Data processing agreements",
      "Right to erasure",
      "Data portability",
      "Privacy by design"
    ]
  },
  {
    icon: Lock,
    title: "ISO 27001",
    description: "Information security management certification",
    badges: ["Security", "Global"],
    points: [
      "Risk management",
      "Security controls",
      "Asset management",
      "Access control"
    ]
  },
  {
    icon: FileCheck,
    title: "SOC 2 Type II",
    description: "Service organization control certification",
    badges: ["Audit", "Security"],
    points: [
      "Security monitoring",
      "Incident response",
      "Change management",
      "Vendor assessment"
    ]
  }
];

const securityMeasures = [
  {
    title: "Data Encryption",
    description: "End-to-end encryption for all sensitive data",
    icon: Lock
  },
  {
    title: "Access Control",
    description: "Role-based access control and authentication",
    icon: Shield
  },
  {
    title: "Global Infrastructure",
    description: "Distributed data centers with redundancy",
    icon: Globe
  }
];

export default function CompliancePage() {
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
              Compliance & Security
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our commitment to maintaining the highest standards of data protection and security
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {complianceFrameworks.map((framework) => (
              <motion.div
                key={framework.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <framework.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{framework.title}</h3>
                      {framework.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="bg-primary/10 text-primary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {framework.description}
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {framework.points.map((point, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto mb-12"
            variants={itemVariants}
          >
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Security Measures</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {securityMeasures.map((measure, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <measure.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{measure.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {measure.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Our Compliance Team</h2>
                <p className="text-muted-foreground mb-6">
                  For detailed information about our compliance programs or security measures, 
                  please reach out to our dedicated compliance team.
                </p>
                <Button variant="outline" className="group" asChild>
                  <Link href="/contact" className="flex items-center">
                    Get in touch with our compliance team
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