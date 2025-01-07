"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Check,
  ArrowRight,
  Building2,
  Zap,
  Star,
  Shield,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

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

const pricingPlans = [
  {
    title: "Starter",
    description: "Perfect for small events and meetups",
    price: {
      monthly: 49,
      yearly: 39
    },
    features: [
      "Up to 100 attendees",
      "Basic event analytics",
      "Email support",
      "Standard templates",
      "Basic integrations"
    ],
    icon: Building2,
    popular: false
  },
  {
    title: "Professional",
    description: "Ideal for growing businesses and conferences",
    price: {
      monthly: 99,
      yearly: 79
    },
    features: [
      "Up to 500 attendees",
      "Advanced analytics",
      "Priority support",
      "Custom templates",
      "Advanced integrations",
      "Custom branding",
      "Multi-user access"
    ],
    icon: Zap,
    popular: true
  },
  {
    title: "Enterprise",
    description: "For large-scale events and organizations",
    price: {
      monthly: 199,
      yearly: 159
    },
    features: [
      "Unlimited attendees",
      "Enterprise analytics",
      "24/7 dedicated support",
      "Custom development",
      "Premium integrations",
      "White-label solution",
      "API access",
      "SLA guarantee"
    ],
    icon: Star,
    popular: false
  }
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all plans come with a 14-day free trial. No credit card required."
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

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
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your event management needs
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  Save 20%
                </Badge>
              </span>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
          >
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className={`relative h-full border-muted-foreground/20 hover:border-primary/50 transition-all duration-300 ${
                  plan.popular ? 'border-primary shadow-lg shadow-primary/10' : ''
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <plan.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{plan.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check className="w-4 h-4 mr-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 mt-1">
                          <HelpCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{faq.question}</h3>
                          <p className="text-sm text-muted-foreground">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <p className="text-muted-foreground mb-4">
              Need help choosing the right plan?
            </p>
            <Button 
              variant="outline"
              asChild
            >
              <Link href="/contact" className="flex items-center">
                Contact Sales Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 