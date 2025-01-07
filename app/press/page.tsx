"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Download,
  Image as ImageIcon,
  FileText,
  Newspaper,
  ArrowRight,
  Mail,
  Award,
  Building2
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

const pressReleases = [
  {
    id: 1,
    title: "Conference Announces Major Expansion in Middle East",
    date: "March 15, 2024",
    description: "Leading event management platform expands operations across UAE and Saudi Arabia.",
    category: "Company News",
    link: "#"
  },
  {
    id: 2,
    title: "New Partnership with Global Tech Leaders",
    date: "February 28, 2024",
    description: "Strategic collaboration to enhance digital event experiences.",
    category: "Partnerships",
    link: "#"
  },
  {
    id: 3,
    title: "Conference Platform Reaches 1 Million Users",
    date: "January 10, 2024",
    description: "Milestone achievement in platform growth and user adoption.",
    category: "Milestone",
    link: "#"
  }
];

const mediaAssets = [
  {
    title: "Brand Guidelines",
    icon: FileText,
    description: "Logo usage, color palette, and typography guidelines",
    downloadUrl: "#",
    fileSize: "2.4 MB"
  },
  {
    title: "Logo Package",
    icon: ImageIcon,
    description: "High-resolution logos in various formats",
    downloadUrl: "#",
    fileSize: "5.1 MB"
  },
  {
    title: "Media Kit",
    icon: Newspaper,
    description: "Company fact sheet, executive bios, and product information",
    downloadUrl: "#",
    fileSize: "3.8 MB"
  }
];

const stats = [
  {
    icon: Building2,
    value: "50+",
    label: "Countries"
  },
  {
    icon: Award,
    value: "15+",
    label: "Industry Awards"
  },
  {
    icon: Mail,
    value: "1M+",
    label: "Users Worldwide"
  }
];

export default function PressPage() {
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
              Press Kit & Media Resources
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access our latest news, brand assets, and media resources
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-muted-foreground/20 hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <p className="text-muted-foreground">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Latest Press Releases</h2>
            <div className="space-y-4">
              {pressReleases.map((release) => (
                <motion.div
                  key={release.id}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-muted-foreground/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <Badge variant="outline" className="mb-2 bg-primary/5">
                            {release.category}
                          </Badge>
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {release.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-2">
                            {release.description}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            {release.date}
                          </p>
                        </div>
                        <Button 
                          variant="outline"
                          className="group-hover:border-primary/50 transition-colors"
                          asChild
                        >
                          <Link href={release.link} className="flex items-center">
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-6">Media Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mediaAssets.map((asset, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 border-muted-foreground/20">
                    <CardContent className="p-6">
                      <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <asset.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{asset.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {asset.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:border-primary/50 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download ({asset.fileSize})
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <p className="text-muted-foreground mb-4">
              For press inquiries, please contact our media relations team
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/contact" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Contact Press Team
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 